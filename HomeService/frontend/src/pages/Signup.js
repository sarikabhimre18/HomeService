import { useEffect, useRef, useState } from "react";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import AnimationRevealPage from "helpers/AnimationRevealPage.js";
import { Container as ContainerBase } from "components/misc/Layouts";
import tw from "twin.macro";
import styled from "styled-components";
import { css } from "styled-components/macro"; //eslint-disable-line
import illustration from "images/signup-illustration.svg";
import logo from "images/U.jpg";
import { ReactComponent as SignUpIcon } from "feather-icons/dist/icons/user-plus.svg";
import { signUpAPI } from "store/authSlice";
import { NavLink, useLocation, useNavigate } from "react-router-dom";

const Container = tw(
  ContainerBase
)`min-h-screen bg-primary-900 text-white font-medium flex justify-center -m-8`;
const Content = tw.div`max-w-screen-xl m-0 sm:mx-20 sm:my-16 bg-white text-gray-900 shadow sm:rounded-lg flex justify-center flex-1`;
const MainContainer = tw.div`lg:w-1/2 xl:w-5/12 p-6 sm:p-12`;
const LogoLink = tw.a``;
const LogoImage = tw.img`h-12 mx-auto`;
const MainContent = tw.div`mt-12 flex flex-col items-center`;
const Heading = tw.h1`text-2xl xl:text-3xl font-extrabold`;
const FormContainer = tw.div`w-full flex-1 mt-8`;
const Form = tw.form`mx-auto max-w-xs`;
const Input = tw.input`w-full px-8 py-4 rounded-lg font-medium bg-gray-100 border border-gray-200 placeholder-gray-500 text-sm focus:outline-none focus:border-gray-400 focus:bg-white mt-5 first:mt-0`;
const SubmitButton = styled.button`
  ${tw`mt-5 tracking-wide font-semibold bg-primary-500 text-gray-100 w-full py-4 rounded-lg hover:bg-primary-900 transition-all duration-300 ease-in-out flex items-center justify-center focus:shadow-outline focus:outline-none`}
  .icon {
    ${tw`w-6 h-6 -ml-2`}
  }
  .text {
    ${tw`ml-3`}
  }
`;
const IllustrationContainer = tw.div`sm:rounded-r-lg flex-1 bg-purple-100 text-center hidden lg:flex justify-center`;
const IllustrationImage = styled.div`
  ${(props) => `background-image: url("${props.imageSrc}");`}
  ${tw`m-12 xl:m-16 w-full max-w-lg bg-contain bg-center bg-no-repeat`}
`;

//Called Signup api and redirect to home page
const SignUp = ({
  logoLinkUrl = "/",
  illustrationImageSrc = illustration,
  headingText = "Sign Up",
  submitButtonText = "Sign Up",
  SubmitButtonIcon = SignUpIcon,
  tosUrl = "#",
  privacyPolicyUrl = "#",
  signInUrl = "/login"
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [data, setData] = useState({ email: "", password: "" });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (data.email && data.password) {
      dispatch(signUpAPI(data));
      navigate("/");
    }
  };

  const handleInput = (key, value) => {
    setData({
      ...data,
      [key]: value
    });
  };

  return (
    <AnimationRevealPage>
      <Container>
        <Content>
          <MainContainer>
            <LogoLink href={logoLinkUrl}>
              <LogoImage src={logo} />
            </LogoLink>
            <MainContent>
              <Heading>{headingText}</Heading>
              <FormContainer>
                <Form>
                  <Input
                    type="email"
                    placeholder="Email"
                    value={data.email}
                    onChange={(event) =>
                      handleInput("email", event.target.value)
                    }
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={data.password}
                    onChange={(event) =>
                      handleInput("password", event.target.value)
                    }
                  />
                  <SubmitButton type="submit" onClick={handleSubmit}>
                    <SubmitButtonIcon className="icon" />
                    <span className="text">{submitButtonText}</span>
                  </SubmitButton>
                  <p tw="mt-6 text-xs text-gray-600 text-center">
                    I agree to abide by treact's
                    <a
                      href={tosUrl}
                      tw="border-b border-gray-500 border-dotted"
                    >
                      Terms of Service
                    </a>
                    and its
                    <a
                      href={privacyPolicyUrl}
                      tw="border-b border-gray-500 border-dotted"
                    >
                      Privacy Policy
                    </a>
                  </p>

                  <p tw="mt-8 text-sm text-gray-600 text-center">
                    Already have an account?
                    <a
                      href={signInUrl}
                      tw="border-b border-gray-500 border-dotted"
                      onClick={() => {
                        navigate("/");
                      }}
                    >
                      Sign In
                    </a>
                  </p>
                </Form>
              </FormContainer>
            </MainContent>
          </MainContainer>
          <IllustrationContainer>
            <IllustrationImage imageSrc={illustrationImageSrc} />
          </IllustrationContainer>
        </Content>
      </Container>
    </AnimationRevealPage>
  );
};

export default SignUp;
