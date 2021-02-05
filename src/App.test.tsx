import React from 'react';
import { render, fireEvent, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import App from './App';
import Form from './components/Form';
import SubmissionList from './components/SubmissionList';
import { debug } from 'console';

const testUserList:Array<any> = [
    {
        firstName: 'Andrew',
        lastName: 'DiZenzo',
        email: 'andrewdizenzojhu@gmail.com',
        note: 'Take the dog for a walk.',
    },
    {
        firstName: 'John',
        lastName: 'Smith',
        email: 'jsmith@gmail.com',
        note: 'Water the plants.',
    }
];

test('The first field in the form should auto-focus on page load', async () => {
    render(<App />)
    const firstNameInput = screen.getByRole('textbox', {name: /first-name/i});
    expect(document.activeElement === firstNameInput).toBe(true);
});

test('The form contains fields for first name, last name, email, and note', async () => {
    render(<Form />)
    const firstNameElem = screen.getByRole('textbox', {name: /first-name/i});
    const lastNameElem = screen.getByRole('textbox', {name: /last-name/i});
    const emailElem = screen.getByRole('textbox', {name: /email/i});
    const noteElem = screen.getByRole('textbox', {name: /note/i});
    expect(firstNameElem).not.toBeNull();
    expect(lastNameElem).not.toBeNull();
    expect(emailElem).not.toBeNull();
    expect(noteElem).not.toBeNull();
});

test('Each item in the submissions list should display first name, last name, email, and note', async () => {
    render(<SubmissionList userList={testUserList} removeUser={() => {}} />)
    const ilElems = screen.getAllByRole('listitem');
    ilElems.forEach((ilElem, ind) => {
        expect(ilElem.innerHTML.includes(testUserList[ind].firstName)).toBe(true);
        expect(ilElem.innerHTML.includes(testUserList[ind].lastName)).toBe(true);
        expect(ilElem.innerHTML.includes(testUserList[ind].email)).toBe(true);
        expect(ilElem.innerHTML.includes(testUserList[ind].note)).toBe(true);
    })
});
