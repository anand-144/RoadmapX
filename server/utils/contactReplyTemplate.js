export const contactReplyTemplate = ({
  name,
}) => {
  return `
<!DOCTYPE html>
<html>

<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<title>We've Received Your Message</title>
</head>

<body
style="
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
width="600"
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

Learn • Build • Share

</p>

</td>

</tr>

<!-- Body -->

<tr>

<td
style="
padding:50px 45px;
"
>

<h2
style="
margin:0 0 20px;
color:#111111;
font-size:28px;
"
>

Thank You for Contacting Us! 🎉

</h2>

<p
style="
color:#555;
font-size:16px;
line-height:28px;
"
>

Hi <strong>${name}</strong>,

</p>

<p
style="
color:#555;
font-size:16px;
line-height:28px;
"
>

Thank you for reaching out to <strong>RoadmapMaker</strong>.

We've successfully received your message and our team will review it as soon as possible.

</p>

<table
width="100%"
cellpadding="0"
cellspacing="0"
>

<tr>

<td
align="center"
style="padding:35px 0;"
>

<div
style="
display:inline-block;
background:#000000;
color:#ffffff;
padding:16px 40px;
border-radius:12px;
font-size:16px;
font-weight:bold;
"
>

✓ Message Received

</div>

</td>

</tr>

</table>

<p
style="
color:#555;
font-size:16px;
line-height:28px;
"
>

Our team usually responds within
<strong>24–48 hours</strong>.

</p>

<p
style="
color:#555;
font-size:16px;
line-height:28px;
"
>

In the meantime, feel free to continue exploring interactive roadmaps and learning resources on RoadmapMaker.

</p>

<hr
style="
margin:40px 0;
border:none;
border-top:1px solid #eeeeee;
"
>

<p
style="
font-size:15px;
color:#777;
line-height:28px;
"
>

If you didn't submit this contact request, you can safely ignore this email.

</p>

</td>

</tr>

<!-- Footer -->

<tr>

<td
align="center"
style="
background:#fafafa;
padding:30px;
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
margin-top:10px;
font-size:13px;
color:#aaa;
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