import React, {useState, useEffect, useRef} from 'react';
import INITIAL_USER_FORM from '../initialUserForm';
import isValidEmail from '../utils/isValidEmail';

export default function Form({addUser}:any) {
    const [userForm, setUserForm] = useState(INITIAL_USER_FORM);
    const [failedSubmit, setFailedSubmit] = useState(false);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
        focusInputRef();
    }, [])

    const focusInputRef = () => {
        if(inputRef!==null) inputRef.current?.focus();
    }

    const handleSubmit = (e:any) => {
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
   
    const changeField = ({target}: any) => {
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
        <form onSubmit={handleSubmit} className="flex-1"> 
            <div className="form-row">
                <label htmlFor="firstName" className="form-label">First Name</label>
                <input ref={inputRef} name="firstName" value={userForm.firstName} onChange={changeField} className="form-input"/>
            </div>
            <div className="form-row">
                <label htmlFor="lastName" className="form-label">Last Name</label>
                <input name="lastName" value={userForm.lastName} onChange={changeField} className="form-input"/>
            </div>
            <div className="form-row">
                <label htmlFor="email" className="form-label">Email</label>
                <input name="email" value={userForm.email} onChange={changeField} className="form-input"/>
                {(failedSubmit && !isValidEmail(userForm.email)) && <p className="text-red-500 text-xs">
                    Email must be valid!
                </p>}
            </div>
            <div className="form-row">
                <label htmlFor="note" className="form-label">Note</label>
                <textarea name="note" value={userForm.note} onChange={changeField} className="form-input"/>
            </div>
            <button type="submit" disabled={formHasEmptyField()} className={"button mt-6 " + (formHasEmptyField() && "button-disabled")}>+ Add User</button>
        </form>
    )
}
