import React, {useState, useEffect, useRef} from 'react';
import INITIAL_USER_FORM from '../initialUserForm';
import isValidEmail from '../utils/isValidEmail';
import UserInfo from '../interfaces/UserInfo';

interface FormProps {
    addUser: (userInfo:UserInfo) => void
}

export default function Form({addUser}:FormProps) {
    const [userForm, setUserForm] = useState<UserInfo>(INITIAL_USER_FORM);
    const [failedSubmit, setFailedSubmit] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        focusInputRef();
    }, [])

    const focusInputRef = () => {
        if(inputRef!==null) inputRef.current?.focus();
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(formHasInvalidField()) {
            setFailedSubmit(true);
        } else {
            addUser(userForm);
            setUserForm(INITIAL_USER_FORM);
            focusInputRef();
            setFailedSubmit(false);
        }
    }
   
    const changeField = ({target}: React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLTextAreaElement>) => {
        setUserForm({
            ...userForm,
            [target.name] : target.value
        })
    }

    const formHasInvalidField = () => {
        for(let [field, value] of Object.entries(userForm)) {
            switch(field) {
                case "email":
                    if(!isValidEmail(value)) return true;
                    break
                default:
                    if(value==="") return true;
            }
        }
        return false;
    }

    const formHasEmptyField = () => {
        return Object.values(userForm).findIndex(value => value==="")>-1;
    }

    return (
        <form aria-label="user-form" onSubmit={handleSubmit} className="flex-1"> 
            <div className="form-row">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input aria-label="first-name" ref={inputRef} name="firstName" value={userForm.firstName} onChange={changeField} className="form-input"/>
                
            </div>
            <div className="form-row">
                <label htmlFor="lastName" className="form-label">Last name</label>
                <input aria-label="last-name" name="lastName" value={userForm.lastName} onChange={changeField} className="form-input"/>
                
            </div>
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email</label>
                <input aria-label="email" name="email" value={userForm.email} onChange={changeField} className={"form-input " + ((failedSubmit && !isValidEmail(userForm.email)) && "form-input-error")}/>
                
                {(failedSubmit && !isValidEmail(userForm.email)) && <p className="text-red-500 text-xs">
                    Email must be valid!
                </p>}
            </div>
            <div className="form-row">
                <label htmlFor="note" className="form-label">Note</label>
                <textarea aria-label="note" name="note" value={userForm.note} onChange={changeField} className="form-input"/>
                
            </div>
            <button type="submit" disabled={formHasEmptyField()} className={"button mt-6 " + (formHasEmptyField() && "button-disabled")}>+ Add User</button>
        </form>
    )
}
