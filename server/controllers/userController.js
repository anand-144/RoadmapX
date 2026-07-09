import User from '../models/User.js'

// Get logged In User
export const getProfile  = async (req,res) => {
    try {
        const user = await User.findById(req.user._id).select("-password");
        if(!user){
            return res.status(404).json({
                success : false,
                message: "User not found.",
            });
        }
        res.status(200).json({
            success : true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success : false,
            message: error.message,
        });
    } 
};

// Update logges in user
export const updateProfile = async (req,res) => {
        try {
            const {name , username , bio} = req.body;

            const user = await User.findById(req.user._id);
            if(!user){
                return res.status(404).json({
                    success: false,
                    message: "User not found.",
                });
            }

    // Check username availability
    if(username && username !== user.username){
        const existingUser = await User.findOne({username});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Username already taken.",
            });
        }
        user.username = username;
    }
    if (name) user.name = name;
    if (bio !== undefined) user.bio = bio; 

    await user.save();

    res.status(200).json({
        success: true,
        message: "Profile updated successfully.",
        user:{
            _id: user._id,
            name: user.name,
            username: user.username,
            email: user.email,
            bio: user.bio,
            role: user.role,
        }
    });

        } catch (error) {
          res.status(500).json({
            success: false,
            message :error.message,
          });
    }
};

// Get user by username (public)

export const getUserByUsername = async (req, res) => {
    try {
        const user = await User.findOne({
            username: req.params.username,
        }).select("-password");

        if(!user){
            return res.status(404).json({
                success: false,
                message: "User not found."
            });
        }
        res.status(200).json({
            success: true,
            user,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
};