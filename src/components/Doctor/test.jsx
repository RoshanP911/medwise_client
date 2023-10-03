const doctorLogin = async (req, res) => {
    try {
      const { email, password } = req.body;
  
  
      const doctor = await Doctor.findOne({ email: email });
  
      if (doctor) {
        const passwordsMatch = await bcryptjs.compare(password, doctor.password);
        if(passwordsMatch){
            if(doctor.is_verified){
                if(doctor.is_approved){
                    if(!doctor.is_blocked){
                        const payload = { userId: doctor._id };
                        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "2h" });
                        return res.status(200).json({ message: "Login Successful", token: token, success: true, doctor });
                    }
                    else{
                        return res.status(400).json({ message: "Account blocked by admin", success: false });
                    }
                }
                else{
                    return res.status(200).json({ message: "Account not approved by admin", success: false, doctor });
                }
            }
            else{
                return res.status(400).json({ message: "Email not verified", success: false });
            }
        }else{
            return res.status(400).json({ message: "Invalid Credentials", success: false });
        }

      }else{
         return res.status(400).json({ message: "Doctor is not registered", success: false });
      }
  
    } catch (error) {
      console.error("An error occurred:", error);
      return res.status(500).json({ message: "Something went wrong", success: false, error });
    }
  };