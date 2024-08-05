import { useState } from "react"

export const useTimeInput = (input, type) => {
    const [value, setValue] = useState(input);

    const handler =(e)=>{
        const numberRegex = /[^0-9-\s]/g;

        if(numberRegex.test(e.target.value)){
            alert("숫자만 입력해주세요.");
            return;
        }

        if(type === "hour" && e.target.value >= 13){
            alert("시간은 12 이하의 숫자를 입력해주세요.");
            setValue("");
            return;
        }
        
        if(type === "min" && e.target.value >= 60){
            alert("분에는 60 미만의 숫자를 입력해주세요.");
            setValue("");
            return;
        }

        setValue(e.target.value);
    }

    return [value, handler, setValue];
}