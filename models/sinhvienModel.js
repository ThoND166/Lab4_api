const mongoose=require('mongoose');
const SinhVienSchema=new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    picture:{
        type: String,
        required: true
    }
});
const SinhVien=mongoose.model('SinhVien',SinhVienSchema);
module.exports=SinhVien;