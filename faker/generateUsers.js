const faker = require('faker')
const accounts = require('../backend/models/accounts')

const numToGenerate = 1000

async function generateUser() {
    const username = faker.internet.userName()
    const password = 'password'
    const rsp = await accounts.testCredentials({ username, password })
    if (rsp.result == 'newUser') {
        let user = rsp.user
        user = await accounts.updateProfilePic({ 
            id: user.id, 
            url: faker.image.avatar()
        })
        user = await accounts.updateBio({
            id: user.id,
            bio: faker.lorem.paragraph()
        })
    }
}

for (i = 0; i < numToGenerate; i++) {
    generateUser()
}
