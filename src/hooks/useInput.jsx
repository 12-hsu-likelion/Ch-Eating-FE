import { useState } from "react"

export const useInput = (input, isPhoneNumber = false) => {
    const [value, setValue] = useState(input);

    const handler = (e) => {
        const blank = /\s/;
        const numberFormat = /[^0-9-\s]/g;

        // 번호 입력을 제외한 모든 input 값에 공백이 들어간다면 return
        // 번호 입력의 경우 전화번호 형식이 아니라면 return
        if(isPhoneNumber){
            if(numberFormat.test(e.target.value)){
                alert("올바른 전화번호를 입력해주세요.");
                return;
            }
        }else{
            if (blank.test(e.target.value)) {
                alert("공백은 사용할 수 없습니다.");
                return;
            }
        }

        setValue(e.target.value);
    }

    return [value, handler, setValue];
}