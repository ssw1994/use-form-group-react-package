Step 1. Install use-form-group package by running below command
npm i use-form-group

Step 2. import the use-form-group hook in react component file.

        import { useFormGroup } from "use-form-group";

        const UserDetails = ()=>{

            const [mobileRequired, setMobileRequired] = useState(false);

            const [userForm, updateForm, updateValidator, clearForm] = useFormGroup({
                userName: {
                    value: "",
                    validation: {
                        required: true,
                        msgs: {
                        required: "firstName is required",
                        },
                    },
                },
                mobileNumber: {
                    value: "",
                    validation: {
                        required: true,
                        pattern: /[0-9]{10}/,
                        msgs: {
                        required: "mobile number is required",
                        pattern: "Invalid mobile number",
                        },
                    },
                },
            });

            const errorStyle = {
                fontSize: "10px",
                color: "red",
                fontStyle: "italic",
            };

            const sucessStyle = {
                fontSize: "10px",
                color: "green",
                fontStyle: "italic",
            };

            const isFormValid = Validator.isFormValid(userForm);

            useEffect(() => {
                if (!mobileRequired) {
                    updateValidator([
                        {
                        id: "mobileNumber",
                        validation: {
                            required: false,
                            pattern: /[0-9]{10}/,
                            msgs: { pattern: "invalid mobile number" },
                        },
                        },
                    ]);
                } else {
                    updateValidator([
                        {
                        id: "mobileNumber",
                        validation: {
                            required: true,
                            pattern: /[0-9]{10}/,
                            msgs: {
                            required: "mobile number is required",
                            pattern: "Invalid mobile number",
                            },
                        },
                        },
                    ]);
                }
                return () => {};
            }, [mobileRequired]);

            const toggleRequired = () => {
                setMobileRequired(!mobileRequired);
            };

                return (
                    <div>
                    <div>
                        <input
                            value={userForm.userName.value}
                            id="userName"
                            placeholder="Username"
                            onChange={updateForm}
                        />
                        {userForm.userName.error ? (
                        <span style={errorStyle}>{userForm.userName.errorMessage}</span>
                        ) : (
                        <span style={sucessStyle}>valid username</span>
                        )}
                    </div>
                    <div>
                        <input
                            value={userForm.mobileNumber.value}
                            id="mobileNumber"
                            placeholder="Mobile Number"
                            onChange={updateForm}
                        />
                        <input
                            type="checkbox"
                            id="mobile-required"
                            defaultValue="false"
                            value={mobileRequired}
                            onChange={() => toggleRequired()}
                        />
                        Required
                        {userForm.mobileNumber.error ? (
                        <span style={errorStyle}>{userForm.mobileNumber.errorMessage}</span>
                        ) : (
                        <span style={sucessStyle}>valid mobile number</span>
                        )}
                    </div>
                    <div>
                        <button disabled={!isFormValid}>Submit</button>
                        <button onClick={clearForm}>Clear Form</button>
                    </div>
                    </div>

                );

        }

<h4><pre>
    Notes :

            1.formgroup key name should be matched with input controller id attribute

            2.For select, control name should be matched with input name attribute

            3.You can check form error state using Validator
                Validator.isFormValid(form);

            4.for each control it's state {error,errorMesssage} is updated run time on user interaction

            5.Valid properties for validation are
                a. required - [true,false]<span style="color='blue'">Check if value is required or not</span>
                b. pattern - [regex]<span style='color="blue"'>valdiate user input against give regex</span>
                c  minLength - [number]<span>Check for min length of the string</span>
                d  maxLength - [number]<span>Check for max length of the string</span>

            6.For each validation , error message can be provided with same name as validation type in msgs.

                validation:{
                    required:true,
                    msgs:{
                        required:"this value is required"
                    }
                }

<pre></h4>
