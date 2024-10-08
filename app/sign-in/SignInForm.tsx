"use client";
import { Formik } from "formik";
import { signIn } from "next-auth/react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import { IconLoader2 } from "@tabler/icons-react";
import * as Yup from "yup";

const SignInSchema = Yup.object({
    username: Yup.string().required("Required"),
    password: Yup.string().required("Required")
});

const initialValue = {
    username: "",
    password: ""
}

const BtnBaseStyles = "transition duration-150 ease-in-out p-2 rounded-sm shadow-sm bg-red-500 text-neutral-100 hover:bg-red-600 h-12";

enum SignInErrors {
    OAuthSignin = "OAuthSignin",
    OAuthCallback = "OAuthCallback",
    OAuthCreateAccount = "OAuthCreateAccount",
    EmailCreateAccount = "EmailCreateAccount",
    Callback = "Callback",
    OAuthAccountNotLinked = "OAuthAccountNotLinked",
    EmailSignin = "EmailSignin",
    CredentialsSignin = "CredentialsSignin",
    SessionRequired = "SessionRequired",
    Default = "Default"
}

export default function SignInForm() {
    let callbackUrl = "/", searchParams = useSearchParams();
    if (searchParams) callbackUrl = searchParams.get("callbackUrl") != null ? searchParams.get("callbackUrl") as string : "/";
    const [responseError, setResponseError] = useState<string | undefined>(undefined);
    const router = useRouter();

    console.log('callbackUrl: ', callbackUrl);


    return (
        <Fragment>
            <Formik
                initialValues={initialValue}
                validationSchema={SignInSchema}
                onSubmit={async (values, { setSubmitting }) => {
                    if (!values.password || !values.username) return;


                    const response = await signIn("credentials", { redirect: false, username: values.username, password: values.password });
                    console.log(response);
                    if (!response) {

                        return;
                    }

                    if (response.error) {
                        switch (response.error) {
                            case SignInErrors.CredentialsSignin: setResponseError("Unexpected error occured, please try again");
                            default: setResponseError("Unexpected Error");
                        }

                        return;
                    }
                    console.log("Response: ", response);
                    if (response.ok && response.status == 200) router.push(callbackUrl);
                    setSubmitting(false);
                    //TODO: On certain instances, loading takes time and the user could still access the interface, fix that
                }}
            >
                {formik => (
                    <form
                        onSubmit={formik.handleSubmit}
                        className="flex flex-col max-w-lg mb-10"
                    >
                        <div className="flex flex-col mb-5">
                            <label className="mb-2 text-base font-semibold" htmlFor="username">Username</label>
                            <input
                                id="username"
                                type="text"
                                className="p-2 rounded-sm"
                                {...formik.getFieldProps("username")}
                            />
                            {formik.touched.username && formik.errors.username ?
                                <p className="mt-1 text-sm font-medium text-red-600">{formik.errors.username}</p>
                                : <Fragment />
                            }
                        </div>


                        <div className="flex flex-col mb-5">
                            <label className="mb-2 text-base font-semibold" htmlFor="password">Password</label>
                            <input
                                id="password"
                                type="password"
                                className="p-2 rounded-sm"
                                {...formik.getFieldProps("password")}
                            />
                            {formik.touched.password && formik.errors.password ?
                                <p className="mt-1 text-sm font-medium text-red-600">{formik.errors.password}</p>
                                : <Fragment />
                            }
                        </div>

                        <button
                            title="Sign in"
                            className={[formik.isSubmitting ? "disabled:bg-red-600 cursor-not-allowed" : "", BtnBaseStyles].join(" ")}
                            type="submit"
                            disabled={formik.isSubmitting}
                        >
                            <ButtonContent isSubmitting={formik.isSubmitting} />
                        </button>
                        {responseError ?
                            <p className="mt-1 text-sm font-medium text-red-600">{responseError}</p>
                            : <Fragment />}
                    </form>
                )}
            </Formik>
            <Register />

        </Fragment>
    )
}

function ButtonContent({ isSubmitting }: { isSubmitting: boolean }) {
    if (isSubmitting) return (
        <div className="inline-flex flex-row items-center justify-center gap-2 pt-1">
            <IconLoader2 className="animate-spin" />
            <p>Signing in</p>
        </div>
    )
    return <p className="inline-flex">Sign in</p>;
}

function Register() {
    return (
        <div className="inline-flex flex-row gap-1 text-sm text-neutral-400">
            <p className="">Not a member? </p>
            <Link className="underline hover:text-neutral-200" href="https://www.themoviedb.org/signup">Sign up with TMDB™</Link>
        </div>
    )
}