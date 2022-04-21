const config = require('config');
const { EC2Config } = config.get('AWSConfig')

module.exports = {
  apps : [{
    name: 'deploy-dev',
    script: 'app.js',
    env_development: {
      NODE_ENV: 'development',
    },
    error_file: 'logs/error.log',
    out_file: 'logs/out.log',
  }],
   
  // Deployment Configuration
  deploy : {
    development : {
      key: "./.key/" + EC2Config.PEM_FILE_NAME,
      "user" : EC2Config.USER,
      "host" : EC2Config.HOST,
      "ref"  : "origin/main",
      "repo" : "https://github.com/greenlabs-yho/deploy.git",
      "path" : "/home/ec2-user/test/deploy-dev",
      "post-deploy" : "npm install && pm2 restart ecosystem.config.js --env development --only deploy-dev"
    }
  }
};