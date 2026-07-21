export const contactTemplate = ({
  name,
  email,
  subject,
  message,
}) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />

<title>New Contact Message</title>
</head>

<body style="
margin:0;
padding:0;
background:#f5f5f5;
font-family:Arial,Helvetica,sans-serif;
">

<table
width="100%"
cellpadding="0"
cellspacing="0"
style="
background:#f5f5f5;
padding:40px 20px;
">

<tr>

<td align="center">

<table
width="650"
cellpadding="0"
cellspacing="0"
style="
background:#ffffff;
border-radius:18px;
overflow:hidden;
border:1px solid #e5e5e5;
">

<!-- Header -->

<tr>

<td
align="center"
style="
background:#000000;
padding:40px 30px;
"
>

<div
style="
width:70px;
height:70px;
background:#ffffff;
border-radius:16px;
line-height:70px;
font-size:34px;
font-weight:bold;
color:#000000;
margin:auto;
"
>

R

</div>

<h1
style="
color:#ffffff;
margin:20px 0 8px;
font-size:30px;
"
>

RoadmapMaker

</h1>

<p
style="
margin:0;
font-size:15px;
color:#facc15;
"
>

New Contact Form Submission

</p>

</td>

</tr>

<!-- Body -->

<tr>

<td
style="
padding:45px;
"
>

<h2
style="
margin:0 0 30px;
font-size:28px;
color:#111111;
"
>

📩 New Message Received

</h2>

<table
width="100%"
cellpadding="12"
cellspacing="0"
style="
border-collapse:collapse;
"
>

<tr>

<td
style="
width:150px;
font-weight:bold;
color:#222;
background:#fafafa;
border:1px solid #eeeeee;
"
>

Name

</td>

<td
style="
border:1px solid #eeeeee;
color:#555;
"
>

${name}

</td>

</tr>

<tr>

<td
style="
font-weight:bold;
background:#fafafa;
border:1px solid #eeeeee;
"
>

Email

</td>

<td
style="
border:1px solid #eeeeee;
"
>

<a
href="mailto:${email}"
style="
color:#000;
text-decoration:none;
"
>

${email}

</a>

</td>

</tr>

<tr>

<td
style="
font-weight:bold;
background:#fafafa;
border:1px solid #eeeeee;
"
>

Subject

</td>

<td
style="
border:1px solid #eeeeee;
"
>

${subject}

</td>

</tr>

<tr>

<td
style="
font-weight:bold;
background:#fafafa;
border:1px solid #eeeeee;
vertical-align:top;
"
>

Message

</td>

<td
style="
border:1px solid #eeeeee;
line-height:28px;
color:#555;
white-space:pre-line;
"
>

${message}

</td>

</tr>

</table>

<p
style="
margin-top:35px;
font-size:14px;
color:#888;
"
>

This email was automatically generated from the
RoadmapMaker Contact Form.

</p>

</td>

</tr>

<!-- Footer -->

<tr>

<td
align="center"
style="
padding:28px;
background:#fafafa;
border-top:1px solid #eeeeee;
"
>

<p
style="
margin:0;
font-size:14px;
color:#888;
"
>

© ${new Date().getFullYear()} RoadmapMaker

</p>

<p
style="
margin-top:8px;
font-size:13px;
color:#aaaaaa;
"
>

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