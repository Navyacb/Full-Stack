function checkPass()
{
    var pass1 = document.getElementById('pass1');
    var pass2 = document.getElementById('pass2');
    var message = document.getElementById('confirmMessage');
    var goodColor = "#66cc66";
    var badColor = "#ff6666";
    if(pass1.value == pass2.value){
        pass2.style.backgroundColor = goodColor;
        message.style.color = goodColor;
        message.innerHTML = "Passwords Match"
    }else{
        pass2.style.backgroundColor = badColor;
        message.style.color = badColor;
        message.innerHTML = "Passwords Do Not Match!"
    }
} 
// function email_validate(email)
// {
// var regMail = /^([_a-zA-Z0-9-]+)(\.[_a-zA-Z0-9-]+)*@([a-zA-Z0-9-]+\.)+([a-zA-Z]{2,3})$/;

//     if(regMail.test(email) == false)
//     {
//     document.getElementById("status").innerHTML = "<span class='text-danger'>Email address is not valid yet.</span>";
//     }
//     else
//     {
//     document.getElementById("status").innerHTML	= "<span class='text-success'>Thanks, you have entered a valid Email address!</span>";	
//     }
// }
function validate()
{
    console.log("enter");
    var x = document.forms["myform"]["txt"].value;
    console.log(x);
    if(text == "")
    {
        alert("please enter valid name");
        document.register.fname.focus();
        return false;
    }
    return true;
}