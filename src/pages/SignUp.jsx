import styled from "styled-components";
import colors from "../styles/colors";
import { useInput } from "../hooks/useInput";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const inputRegexs = {
    // 대소문자 및 숫자, 하이픈, 언더스코어 포함 6~12글자
    idReg: /^[a-zA-Z0-9-_]{6,12}$/,
    // 최소 하나의 소문자, 숫자, 특수문자 8~24글자
    pwReg: /^(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/
};


const SignUp = () => {
    const [id, handleId, setId] = useInput("");
    const [pw, handlePw, setPw] = useInput("");
    const [matchPw, handleMatch, setMatch] = useInput("");

    const [name, handleName, setName] = useInput("");
    const [phoneNumber, handlePhoneNumber, setPhoneNumber] = useInput("", true);
    const [code, handleCode, setCode] = useInput("");

    const [currentSection, setCurrentSection] = useState("login-info");

    const [inputTestMsg, setInputTestMsg] = useState({
        idMsg: "",
        pwMsg: "",
        matchMsg: "",
        codeMsg: ""
    });

    const [error, setError] = useState({
        idError: {
            formatError: false,
            dupError: true
        },
        pwError: false,
        matchError: false,
        verificationCodeError: true
    });

    const inputCodeRef = useRef();

    // 이건 에러 코드가 변경됐을 시 에러 코드 상태 보여주는 것 나중에 지우셈
    // useEffect(() => {
    //     console.log(error);
    // }, [error]);
    
    // 다음 버튼 클릭했을 시 정보 입력 폼 변경 / 모든 폼을 입력했을 시 회원가입 정보 제출이 되도록하는 함수
    // 나중에 async 함수로 바꿀 것
    const onSubmit = () => {
        if(currentSection === "login-info"){
            setCurrentSection("user-info");
            gsap.to(".slider", {
                x: "-100%",
                duration: .5,
                ease: "power2.out"
            })
        }
        else{
            console.log({
                id: id,
                pw: pw,
                name: name,
                phoneNumber: phoneNumber
            })
        }
    }

    // 아이디 중복 확인하는 함수 
    // 현재는 그냥 중복 확인을 누를 시 dupError가 false가 되도록 설정해놓음
    // 나중에 async 함수로 바꿀 것
    const checkIdDup = () => {
        if(error.idError.formatError){
            alert("올바른 아이디 형식을 입력 후 중복 확인을 해주세요.");
            return;
        }

        setError(prev => ({
            ...prev,
            idError: {
                ...prev.idError,
                dupError: false
            }
        }));
        setInputTestMsg((prev)=>({
            ...prev,
            idMsg: "사용 가능한 아이디입니다."
        }))
    }
    
    // 인증 번호를 발송하라는 요청을 하는 함수
    // 현재는 그냥 빈 함수임
    // 나중에 async 함수로 바꿀 것
    const sendAuthCode = () => {
        alert(`${phoneNumber}로 6자리 인증코드가 발송되었습니다!`);
        inputCodeRef.current.focus();
    }

    // 6자리가 입력이 된다면 인증 코드를 post하는 함수
    // post에서 올바른 인증이 온다면 verificationCodeError를 false로
    // 나중에 올바른 로직으로 수정할 것
    const verifyAuthCode = async () => {
        try{
            setError((prev)=>({
                ...prev,
                verificationCodeError: false
            }))
            setInputTestMsg((prev)=>({
                ...prev,
                codeMsg: "인증되었습니다"
            }))
        }catch(e){
            console.log(e);
            setInputTestMsg((prev)=>({
                ...prev,
                codeMsg: "인증번호가 올바르지 않습니다"
            }))
        }
    }

    // code 입력 필드의 값이 6이 될 시 인증 코드가 맞는지 확인하는 함수를 호출하는 useEffect
    useEffect(()=>{
        if(code.length===6){
            verifyAuthCode();
        }
    }, [code])

    useEffect(() => {
        if (!inputRegexs.idReg.test(id)) {
            setError(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: true
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "아이디는 6~12글자이어야 합니다."
            });
        } else {
            setError(prev => ({
                ...prev,
                idError: {
                    ...prev.idError,
                    formatError: false
                }
            }));
            setInputTestMsg({
                ...inputTestMsg,
                idMsg: "형식에 맞는 아이디입니다! 중복을 검사해주세요."
            });
        }
    }, [id]);

    useEffect(() => {
        if (!inputRegexs.pwReg.test(pw)) {
            setError({
                ...error,
                pwError: true
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "비밀번호는 최소 하나의 대소문자를 포함하여 8~24글자이어야 합니다."
            });
        } else {
            setError({
                ...error,
                pwError: false
            });
            setInputTestMsg({
                ...inputTestMsg,
                pwMsg: "사용 가능한 비밀번호입니다."
            });
        }
    }, [pw]);

    useEffect(() => {
        if (matchPw !== pw) {
            setError(prev => ({
                ...prev,
                matchError: true
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 맞지 않습니다."
            }));
        } else {
            setError(prev => ({
                ...prev,
                matchError: false
            }));
            setInputTestMsg(prev => ({
                ...prev,
                matchMsg: "비밀번호가 일치합니다."
            }));
        }
    }, [pw, matchPw]);

    // 자동 하이픈 생성 로직
    // 그냥 숫자만 입력 시(11자리) 자동 하이픈
    // 공백 혹은 하이픈과 같이 입력 시(13자리) 없앤 후 3/4/4자리 나눠서 자동 하이픈
    useEffect(()=>{
        if(phoneNumber.length === 11){
            setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
        else if(phoneNumber.length === 13){
            setPhoneNumber(phoneNumber.replace(/[\s-]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
        }
    }, [phoneNumber]);

    return (
        <SignUpWrapper className="pageContainer">
            <div className="signUp-content">
                <header>
                    <p>회원가입</p>
                    {currentSection === "login-info" ? (
                        <h2>로그인 정보를 입력해주세요.</h2>
                    ) : (
                        <h2>개인정보를 입력해주세요.</h2>
                    )}
                </header>

                <div className="input-wrapper">
                    <div className="slider">
                        <div className="login-info">
                            <div className="input id-input">
                                <p>아이디</p>
                                <input
                                    type="text"
                                    name="id"
                                    value={id}
                                    onChange={handleId}
                                    placeholder="*(필수) 6~12자 이내, 영문, 숫자 사용가능"
                                    required
                                />
                                {id !== "" && (
                                    <Msg $error={error.idError.formatError}>
                                        {inputTestMsg.idMsg}
                                    </Msg>
                                )}
                                <button onClick={checkIdDup} disabled={id.length === 0 ? true : false}>
                                    중복확인
                                </button>
                            </div>

                            <div className="input pw-input">
                                <p>비밀번호</p>
                                <input
                                    type="text"
                                    value={pw}
                                    onChange={handlePw}
                                    placeholder="*(필수) 8자 이상, 영문, 숫자, 특수문자 필수"
                                    required
                                />
                                {pw !== "" && (
                                    <Msg $error={error.pwError}>
                                        {inputTestMsg.pwMsg}
                                    </Msg>
                                )}
                            </div>

                            <div className="input check-input">
                                <p>비밀번호 확인</p>
                                <input
                                    type="text"
                                    value={matchPw}
                                    onChange={handleMatch}
                                    required
                                />
                                {matchPw !== "" && (
                                    <Msg $error={error.matchError}>
                                        {inputTestMsg.matchMsg}
                                    </Msg>
                                )}
                            </div>
                        </div>

                        <div className="user-info">
                            <div className="input name-input">
                                <p>이름</p>
                                <input
                                    type="text"
                                    placeholder="*(필수)이름을 입력해주세요"
                                    required
                                    value={name}
                                    onChange={handleName}
                                />
                            </div>

                            <div className="input phone-number-input">
                                <p>전화번호</p>
                                <input
                                    type="text"
                                    placeholder="*(필수)전화번호를 입력해주세요."
                                    required
                                    value={phoneNumber}
                                    onChange={handlePhoneNumber}
                                    name="phone-number"
                                    maxLength={13}
                                />
                                <button onClick={sendAuthCode} disabled={phoneNumber.length===13? false : true}>인증받기</button>
                            </div>

                            <div className="input verification-code-input">
                                <p>인증번호 입력</p>
                                <input
                                    type="text"
                                    placeholder="인증번호를 입력해주세요."
                                    required
                                    value={code}
                                    onChange={handleCode}
                                    ref={inputCodeRef}
                                    maxLength={6}
                                />
                                {code !== "" && (
                                    <Msg $error={error.verificationCodeError}>
                                        {inputTestMsg.codeMsg}
                                    </Msg>
                                )}
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={onSubmit}
                    className="next"
                    disabled={
                        currentSection === "login-info" &&
                        (error.idError.formatError ||
                            error.idError.dupError ||
                            error.pwError ||
                            error.matchError) ||
                        currentSection === "user-info" && (
                            name === "" ||
                            phoneNumber === "" ||
                            error.verificationCodeError
                        )
                    }
                >
                    다음
                </button>
            </div>
        </SignUpWrapper>
    );
};

const SignUpWrapper = styled.section`
  height: 100vh;
  //마진 상쇄 방지 border
  border: .000000000001px solid transparent;

  .signUp-content {
    width: 92%;
    margin: 0 auto;
    margin-top: 230px;

    header {
      margin-bottom: 94px;

      > p {
        font-size: 18px;
        color: ${colors.gray6};
        margin-bottom: 7px;
      }

      h2 {
        font-size: 24px;
        font-weight: 700;
        color: ${colors.black};
      }
    }

    .input-wrapper {
      overflow-x: hidden;
      width: 100%;

      .slider {
        width: 100%;
        display: flex;
        /* transform: translateX(-100%); */
        
        .login-info {
          width: 100%;
          flex-shrink: 0;
        }

        .user-info{
            width: 100%;
            flex-shrink: 0;

            input{
                padding-left: 2.6px;
            }
        }
        
        .input {
            width: 100%;
            position: relative;
            margin-bottom: 30px;
            height: 49px;

            p {
              font-size: 14px;
              color: ${colors.gray5};
              margin-bottom: 8px;
              font-weight: 600;
            }

            input {
              width: 100%;
              margin-left: -2.9px;
              color: ${colors.black};
              font-size: 12px;
              margin-bottom: 4px;
              padding-bottom: 3px;
              border-bottom: 1px solid ${colors.gray3};

              &:focus{
                border-bottom: 1px solid ${colors.mainColor};
              }
            }

            input[name="id"],
            input[name="phone-number"] {
              padding-right: 80px;
            }

            input::placeholder {
              color: ${colors.gray3};
            }

            button {
              position: absolute;
              top: 0;
              right: 1px;
              background: ${colors.mainColor};
              color: ${colors.gray1};
              font-size: 10px;
              border-radius: 2px;
              padding: 11px 12px;
            }
            
            button:disabled{
             background-color: ${colors.gray2};
             color: #9FA4A8;
             pointer-events: none;
            }
          }
      }
    }

    .next {
      background-color: ${colors.mainColor};
      width: 100%;
      border-radius: 29px;
      font-size: 16px;
      color: ${colors.gray1};
      padding: 18px 0;
      margin-top: 130px;
    }

    .next:disabled {
      background-color: ${colors.gray2};
      color: #9FA4A8;
      pointer-events: none;
    }
  }
`;

const Msg = styled.div`
  font-size: 10px;
  color: ${({ $error }) => $error ? `${colors.error}` : "#0066FF"};
`;

export default SignUp;
