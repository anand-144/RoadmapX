export const passwordResetTemplate = ({
  name,
  resetURL,
}) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>Reset Password</title>
</head>

<body style="
margin:0;
padding:0;
background:#f5f5f5;
font-family:Arial,Helvetica,sans-serif;
">

<table width="100%" cellpadding="0" cellspacing="0" style="background:#f5f5f5;padding:40px 20px;">

<tr>
<td align="center">

<table width="600" cellpadding="0" cellspacing="0" style="
background:#ffffff;
border-radius:18px;
overflow:hidden;
border:1px solid #e5e5e5;
">

<!-- Header -->

<tr>
<td align="center" style="
background:#000000;
padding:40px 30px;
">

<div style="
width:70px;
height:70px;
background:#ffffff;
border-radius:16px;
line-height:70px;
font-size:34px;
font-weight:bold;
color:#000000;
margin:auto;
">
R
</div>

<h1 style="
color:#ffffff;
margin:20px 0 8px;
font-size:30px;
">
RoadmapX
</h1>

<p style="
color: yellow;
margin:0;
font-size:15px;
">
Learn • Build • Share
</p>

</td>
</tr>

<!-- Body -->

<tr>
<td style="padding:50px 45px;">

<h2 style="
margin:0 0 20px;
color:#111111;
font-size:28px;
">
Reset Your Password
</h2>

<p style="
color:#555;
font-size:16px;
line-height:28px;
">

Hi <strong>${name}</strong>,

</p>

<p style="
color:#555;
font-size:16px;
line-height:28px;
">

We received a request to reset the password for your
RoadmapX account.

If this was you, click the button below.

</p>

<table width="100%" cellpadding="0" cellspacing="0">

<tr>

<td align="center" style="padding:30px 0;">

<a
href="${resetURL}"
style="
display:inline-block;
background:#000000;
color:#ffffff;
padding:16px 40px;
border-radius:12px;
text-decoration:none;
font-size:16px;
font-weight:bold;
">

Reset Password

</a>

</td>

</tr>

</table>

<p style="
color:#777;
font-size:15px;
line-height:28px;
">

This password reset link is valid for
<strong>15 minutes</strong>.

</p>

<p style="
color:#777;
font-size:15px;
line-height:28px;
">

If you didn't request a password reset,
you can safely ignore this email.
Your password will remain unchanged.

</p>

<hr style="
margin:40px 0;
border:none;
border-top:1px solid #eeeeee;
">

<p style="
font-size:14px;
color:#999;
line-height:24px;
">

Having trouble with the button?

Copy and paste this link into your browser:

</p>

<p style="
word-break:break-all;
font-size:14px;
color:#000;
">

${resetURL}

</p>

</td>
</tr>

<!-- Footer -->

<tr>

<td align="center"
style="
background:#fafafa;
padding:30px;
border-top:1px solid #eeeeee;
">

<p style="
margin:0;
font-size:14px;
color:#888;
">

© ${new Date().getFullYear()} RoadmapX

</p>

<p style="
margin-top:10px;
font-size:13px;
color:#aaa;
">

Learn • Build • Share

</p>

</td>

</tr>

</table>

</td>

</tr>

</table>

</body>

</html>
`;
};