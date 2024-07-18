import { useState } from "react"

export const useInput = (input) => {
    const [value, setValue] = useState(input);

    const handler = (e) =>{
        const blank = /\s/;

        if(blank.test(e.target.value)){
            alert("공백은 사용할 수 없습니다.");
            return;
        }

        setValue(e.target.value);
    }

    return [value, handler, setValue];
}