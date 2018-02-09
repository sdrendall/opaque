const path = require('path')
const fs = require('fs')
const express = require('express')
const multer = require('multer')
const uidSafe = require('uid-safe')
const knox = require('knox')
const accounts = require('../models/accounts')
const { bucket, dataDir, s3url } = require('../config/aws')
const { key, secret } = process.env.NODE_ENV == 'production'
    ? process.env
    : require('../config/aws_credentials')

const router = express.Router()

const diskStorage = multer.diskStorage({
    destination: (req, file, callback) => {
        const outputPath = path.resolve(__dirname, '../../uploads')
        console.log(outputPath)
        callback(null, outputPath)
    },
    filename: (req, file, callback) => {
        uidSafe(24).then(uid => 
            callback(null, uid + path.extname(file.originalname))
        )
    }
})

const uploader = multer({
    storage: diskStorage,
    limits: {
        fileSize: 2097152 // 2 Mb
    }
})

const awsClient = knox.createClient({ key, secret, bucket })

function uploadToS3(req, res, next) {
    const readStream = fs.createReadStream(req.file.path)
    const s3path = path.join(dataDir, req.file.filename)
    const s3req = awsClient.put(s3path, {
        'Content-Type': req.file.mimetype,
        'Content-Length': req.file.size,
        'x-amz-acl': 'public-read'
    })
    readStream.pipe(s3req)

    s3req.on('response', s3res => {
        if (s3res.statusCode == 200) {
            req.body.src = s3url + s3path
            next()
        } else {
            res.json({ 
                success: false,
                reason: 'Upload to S3 failed!'
            })
        }
    })
}

router.post('/upload',
    uploader.single('file'), 
    uploadToS3,
    (req, res) => {
        accounts
            .updateProfilePic({
                id: req.session.user.id,
                url: req.body.src,
            })
            .then(user => {
                req.session.user = user
                res.json({
                    user,
                    success: true 
                })
            })
    }
)

module.exports = router
