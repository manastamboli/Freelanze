const mongoose= require('../db/connection');


try {

    let User = function (data) {
        this.data = data
    };

    User.schema = new mongoose.Schema(
        {
            userName: {
                type: String,
                required: true
            },
            
            userEmail: {
                type: String,
                required: true
            },
            userPassword: {
                type: String

            },
            role: {
                type: String,
                enum: ['freelancer', 'employer'],
               
            },
            skills: {
                type: [String],
            },
            userExperience:[
                {
                    title: {
                        type: String,
                        
                    },
                    company: {
                        type: String,
                        
                    },
                    startDate: {
                        type: Date,
                        
                    },
                    endDate: {
                        type: Date
                    },
                    currentRole: {
                        type: Boolean,
                        default: false
                    }
                }
            ],
            refreshToken: {
                type: String
            }
        }

    )

    User.model = mongoose.models.users || mongoose.model('users', User.schema);

    module.exports = User;
} catch (error) {
    console.log('error from user schema', error);
}
