const signout =(e)=>{
    console.log("inside signout");
    localStorage.clear();
    window.location = '/';
} 
export default signout;