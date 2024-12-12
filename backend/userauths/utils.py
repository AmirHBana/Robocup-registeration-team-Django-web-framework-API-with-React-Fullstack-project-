# import smtplib
# import random
#
# from email.mime.multipart import MIMEMultipart
# from email.mime.text import MIMEText
#
# def send_otp_email(email):
#     # Generate a random 8-digit OTP
#     otp = ''.join([str(random.randint(0, 9)) for _ in range(8)])
#
#     # Email configuration
#     sender_email = 'amir666arrow@gmail.com'
#     sender_password = 'xfjmaxmziavvriyd'
#     receiver_email = email
#
#     # Create message container
#     message = MIMEMultipart()
#     message['From'] = sender_email
#     message['To'] = receiver_email
#     message['Subject'] = "Password Reset OTP"
#
#     # Email body
#     body = f"Your OTP for password reset is: {otp}"
#     message.attach(MIMEText(body, 'plain'))
#
#     # Connect to Gmail server
#     server = smtplib.SMTP('smtp.gmail.com', 587)
#     server.starttls()
#     server.login(sender_email, sender_password)
#
#     # Send the email
#     server.sendmail(sender_email, receiver_email, message.as_string())
#
#     # Close the connection
#     server.quit()
#
#     return otp

# import sys
# from PDFNetPython3.PDFNetPython import PDFDoc, Optimizer, SDFDoc, PDFNet
#
# def compress_file(input_file: str, output_file: str):
#     try:
#         PDFNet.Initialize()
#         doc = PDFDoc(input_file)
#         doc.InitSecurityHandler()
#         Optimizer.Optimize(doc)
#         doc.Save(output_file, SDFDoc.e_linearized)
#         doc.Close()
#     except Exception as e:
#         return False
#     return True
#
# if __name__ == "__main__":
#     if len(sys.argv) < 3:
#          print("Please provide input and output file paths")
#     else:
#         input_file = sys.argv[1]
#         output_file = sys.argv[2]
#         compress_file(input_file, output_file)

