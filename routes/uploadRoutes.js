const router = require('express').Router();
const mongoose = require('mongoose');
const uuid = require('uuid/v1');
const requireLogin = require('../middlewares/requireLogin');
const { accessKeyId, secretAccessKey } = require('../config/keys');
const AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId,
  secretAccessKey,
  signatureVersion: 'v4',
  region: 'us-west-2',
});
const Blog = mongoose.model('Blog');

router.get('/', requireLogin, async (req, res) => {
  const key = `${req.user._id}/${uuid()}.jpeg`;

  s3.getSignedUrl(
    'putObject',
    {
      Bucket: 'my-blog-bucket-456',
      ContentType: 'jpeg',
      Key: key,
    },
    (err, url) => res.send({ key, url })
  );
});

router.post('/', requireLogin, async (req, res) => {});

module.exports = router;
