import RightComponent from "../Component/RightComponent";
import SignUpForm from "../Component/SignUpForm";
const SignUpPage = () => {


  return (
    <div className="p-10 flex md:h-screen h-fit justify-center items-center ">


      <RightComponent formName={<SignUpForm/>} GoogleValue={'Sign Up'}/>
    </div>
  );
};

export default SignUpPage;
