"use client"
import styled from "styled-components"
import { useRecoilValue } from "recoil"
import { shpereControlState } from "@/state/sphere";
import { useEffect, useState } from "react";
import { Wrapper, Container ,media} from "./common/Component";
import Backward from "./common/Backward";
import { useQuery } from "react-query";
import axios from "axios";
import { GoogleReCaptcha, useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import { useRouter } from "next/navigation"
import { Oval } from 'react-loader-spinner'



const ContactWrapper = styled(Wrapper)``
const ContactContainer = styled(Container)``
const ContactInputContainer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  width: 100%;

`
const ContactInputGroup = styled.div`
  width: 365px;
  /* width: 365px; */
`
const ContactInput = styled.input`
  width  : 100%;
  background-color: transparent;
  border: none;
  padding:10px 8px;
  height: 60px;
  outline: none;
  margin-bottom: 24px;
  color: #ccc;
  background: rgba(230, 230, 230, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
  font-size: 16px;
  border-radius: 5px;
  
  ::placeholder{
    font-size: 16px;
    color:#ffffff80;
  }
  
  
  ${media.tablet`
    ::placeholder{
    font-size: 14px;
    }
  `}
`
const ContactTextarea = styled.textarea`
  width:365px;
  height:365px;
  font-size: 16px;
  padding:10px 8px;
  outline: none;
  color:#ccc;
  background: rgba(230, 230, 230, 0.4);
  box-shadow: 0 4px 30px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(6.6px);
  -webkit-backdrop-filter: blur(6.6px);
  border-radius: 5px;
  ::placeholder{
    font-size: 16px;
    color:#ffffff80;
  }


 
  ${media.tablet`
    ::placeholder{
    font-size: 14px;
    }
  `}

`

const InputLabel = styled.label`
  font-size: 16px;
  color:#ffffff80;
`

const SendButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
  margin-top: 24px;
`
const SendButton = styled.button`
  width: 100%;
  height: 42px;
  background-color: #001c30;
  border-radius: 5px;
  color:#ccc;
  border: none;
  box-shadow: 0 4px 30px rgba(238, 235, 235, 0.1);
  font-size: 18px;
  padding: 10px 0;

  cursor:pointer;

  ${media.tablet`
    font-size: 16px;
  `}

`
const LoadingSpinnerContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top:0;
  left:0;
  width: 100%;
  height: 100vh;
  background-color: #001c30;
  opacity: .8;

`
const LoadingSpinner = styled(Oval)`
`


function Contact({ index, closeFunction }) {
  const sphereState = useRecoilValue(shpereControlState);
  const [contactContent, setcontactContent] = useState({
    name: null,
    email: null,
    text: null,
  })
  const { executeRecaptcha } = useGoogleReCaptcha();
  const [isCaptchaVerified, setIsCaptchaVerified] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();




  const sendEamil = async () => {
    return await axios({
      method: "POST",
      data: contactContent,
      url: `${process.env.NEXT_PUBLIC_API_SERVER}/contact/email`,
    })
  }

  const { refetch: sendEamilRefetch } = useQuery("sendEamil", sendEamil, {
    enabled: false,
    onSuccess: response => {
      if (response.data.status === "success") {
        console.log('response.data', response.data)
        setIsLoading(false)
        alert("문의가 정상적으로 요청되었습니다.");
        setcontactContent({
          name: null,
          email: null,
          text: null,
        })
        // location.href="/"
        router.replace("/")
      }
    },
    onError: error => {
      setIsLoading(false);
      alert("문의에 실패했습니다. 잠시후 다시 시도해주세요.")
      console.log("Error Occured : ", error);
    }
  });

  const handleInputChange = (e) => {
    const id = e.currentTarget.id;
    const value = e.currentTarget.value;

    setcontactContent(prev => {
      return {
        ...prev,
        [id]: value,
      }
    })
  }

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }


  const submitContact = async () => {
    // if(contactContent.name.length === 0 || !contactContent.name){
    //   alert("성함을 입력해주세요.");
    //   return false;
    // }else if(validateEmail(contactContent.email)===false){
    //   alert("이메일을 올바르게 입력해주세요.");
    //   return false;

    // }else if(contactContent.text.length === 0 || !contactContent.text){
    //   alert("문의사항을 입력해주세요.");
    //   return false;
    // }
    setIsLoading(true);


    if (!isCaptchaVerified) {
      alert('reCAPTCHA 검증을 완료해주세요.');
      return;
    }

    const captchaToken = await executeRecaptcha('contact_form');
    if (!captchaToken) {
      alert('reCAPTCHA 토큰 생성에 실패했습니다.');
      return;
    }

    setcontactContent(prev => {
      return {
        ...prev,
        recaptchaToken: captchaToken,
      }
    })


    sendEamilRefetch();
  }


  const handleOnVerify = (token) => {
    setIsCaptchaVerified(true);
    setcontactContent(prev => ({
      ...prev,
      recaptchaToken: token,
    }));
  }

  useEffect(() => {
    console.log('isLoading', isLoading)
  }, [isLoading])


  return (
    <ContactWrapper rightProps={index === sphereState.index ? "0" : "150"}>
      {isLoading ?
        <LoadingSpinnerContainer>
          <Oval
            height="80"
            width="80"
            radius="9"
            color="#fefefe"
            secondaryColor="tomato"
            ariaLabel="loading"
          />
        </LoadingSpinnerContainer>
        :
        <ContactContainer>
          <Backward closeFunction={closeFunction}></Backward>
          <h2>Contact</h2>
          <ContactInputContainer>
            <ContactInputGroup>
              <ContactInput type="text" name="name" id="name" placeholder="성함" maxLength={5} onChange={handleInputChange} value={contactContent.name || ""} />
            </ContactInputGroup>
            <ContactInputGroup>
              <ContactInput type="email" name="email" id="email" placeholder="이메일" onChange={handleInputChange} value={contactContent.email || ""} />
            </ContactInputGroup>
            <ContactInputGroup>
              {/* <InputLabel>문의사항</InputLabel> */}
              <ContactTextarea placeholder="문의사항" id="text" onChange={handleInputChange} value={contactContent.text || ""}></ContactTextarea>
            </ContactInputGroup>
          </ContactInputContainer>
          <GoogleReCaptcha onVerify={handleOnVerify} action="contact_form" />
          <SendButtonContainer>
            <SendButton onClick={submitContact}>
              문의하기
            </SendButton>
          </SendButtonContainer>
        </ContactContainer>
      }

    </ContactWrapper>
  );
}

export default Contact;