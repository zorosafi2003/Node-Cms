const mongoose = require('mongoose');
const Post = mongoose.model('post');
const faker = require('faker');

module.exports.seed = () => {
    Post.countDocuments().then(count => {
        if (count == 0) {
            var posts = [];
            //fake records
            for (let index = 0; index < 100; index++) {
                let post = new Post();
                post.title = faker.name.title();
                post.status = 'public';
                post.allowComments = faker.random.boolean();
                post.body = faker.lorem.text();
                posts.push(post);
            }
            Post.create(posts).then(() => {
                console.log('Success seed post records');
            }).catch(err => {
                console.log('Err seed post records');
                throw err;
            })
        }
    })
}