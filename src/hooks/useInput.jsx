import { useEffect, useState } from "react"

export const useInput = (input, isPhoneNumber = false) => {
    const [value, setValue] = useState(input);

    const handler = (e) => {
        const blank = /\s/;
        const numberFormat = /[^0-9-\s]/g;

        // 번호 입력을 제외한 모든 input 값에 공백이 들어간다면 return
        // 번호 입력의 경우 전화번호 형식이 아니라면 return
        if (isPhoneNumber) {
            if (numberFormat.test(e.target.value)) {
                alert("숫자를 입력해주세요.");
                return;
            }

        } else {
            if (blank.test(e.target.value)) {
                alert("공백은 사용할 수 없습니다.");
                return;
            }
        }

        setValue(e.target.value);
    }

    // 자동 하이픈 생성 로직
    // 그냥 숫자만 입력 시(11자리) 자동 하이픈
    // 공백 혹은 하이픈과 같이 입력 시(13자리) 없앤 후 3/4/4자리 나눠서 자동 하이픈
    if (isPhoneNumber) {
        useEffect(() => {
            if (value.length === 11) {
                setValue(value.replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            }
            else if (value.length === 13) {
                setValue(value.replace(/[\s-]/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
            }
        }, [value]);
    }

    return [value, handler, setValue];
}