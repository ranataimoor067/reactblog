import{r as a,u as S,j as e,a as w,l as h}from"./index-BrEYpHH-.js";const $=({theme:n})=>{const[d,y]=a.useState(""),[g,b]=a.useState(""),[s,v]=a.useState(""),[c,P]=a.useState(""),[x,r]=a.useState(""),[m,u]=a.useState(""),[o,j]=a.useState(!1),f=S(),N=async t=>{var i,l;if(t.preventDefault(),r(""),u(""),!d||!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(d)){r("Please enter a valid email address");return}try{await w.post(`${h}/api/auth/forgot-password/generate-otp`,{email:d}),u("OTP has been sent to your email"),j(!0)}catch(p){r(((l=(i=p.response)==null?void 0:i.data)==null?void 0:l.message)||"Failed to send OTP")}},k=async t=>{var i,l;if(t.preventDefault(),r(""),u(""),!g||!s||!c){r("All fields are required");return}if(s!==c){r("Passwords do not match");return}if(s.length<8){r("Password must be at least 8 characters long");return}if(!/(?=.*[A-Z])/.test(s)){r("Password must contain at least one uppercase letter");return}if(!/(?=.*[0-9])/.test(s)){r("Password must contain at least one number");return}if(!/(?=.*[!@#$%^&*])/.test(s)){r("Password must contain at least one special character (!@#$%^&*)");return}try{await w.post(`${h}/api/auth/reset-password`,{email:d,otp:g,newPassword:s,confirmPassword:c}),u("Password reset successful! Redirecting to login..."),setTimeout(()=>f("/"),2e3)}catch(p){r(((l=(i=p.response)==null?void 0:i.data)==null?void 0:l.error)||"Failed to reset password")}};return e.jsx("div",{className:"min-h-screen flex items-center justify-center px-4",children:e.jsxs("div",{className:`max-w-md w-full space-y-8 p-8 rounded-xl shadow-2xl ${n==="dark"?"bg-gray-800 text-white":"bg-white"}`,children:[e.jsxs("div",{className:"text-center",children:[e.jsx("h2",{className:"text-3xl font-extrabold",children:o?"Reset Password":"Forgot Password"}),e.jsx("p",{className:"mt-2 text-sm text-gray-500",children:o?"Enter the OTP sent to your email and your new password":"Enter your email to receive a password reset OTP"})]}),x&&e.jsx("div",{className:"bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative",children:x}),m&&e.jsx("div",{className:"bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative",children:m}),e.jsxs("form",{className:"mt-8 space-y-6",onSubmit:o?k:N,children:[e.jsxs("div",{className:"space-y-4",children:[e.jsx("input",{type:"email",value:d,onChange:t=>y(t.target.value),placeholder:"Email address",className:`appearance-none rounded-lg relative block w-full px-3 py-2 border ${n==="dark"?"bg-gray-700 border-gray-600 text-white":"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`,disabled:o}),o&&e.jsxs(e.Fragment,{children:[e.jsx("input",{type:"text",value:g,onChange:t=>b(t.target.value),placeholder:"Enter OTP",className:`appearance-none rounded-lg relative block w-full px-3 py-2 border ${n==="dark"?"bg-gray-700 border-gray-600 text-white":"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}),e.jsx("input",{type:"password",value:s,onChange:t=>v(t.target.value),placeholder:"New Password",className:`appearance-none rounded-lg relative block w-full px-3 py-2 border ${n==="dark"?"bg-gray-700 border-gray-600 text-white":"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`}),e.jsx("input",{type:"password",value:c,onChange:t=>P(t.target.value),placeholder:"Confirm New Password",className:`appearance-none rounded-lg relative block w-full px-3 py-2 border ${n==="dark"?"bg-gray-700 border-gray-600 text-white":"border-gray-300"} placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm`})]})]}),e.jsx("button",{type:"submit",className:"group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500",children:o?"Reset Password":"Send OTP"})]}),e.jsx("div",{className:"text-center mt-4",children:e.jsx("button",{onClick:()=>f("/"),className:"text-sm text-indigo-600 hover:text-indigo-500",children:"Back to Login"})})]})})};export{$ as default};
