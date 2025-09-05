import {
  Body,
  Container,
  Head,
  Heading,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Button,
} from "npm:@react-email/components@0.0.22";
import * as React from "npm:react@18.3.1";

interface PasswordResetEmailProps {
  firstName: string;
  resetUrl: string;
  expiresAt: string;
}

export const PasswordResetEmail = ({
  firstName,
  resetUrl,
  expiresAt,
}: PasswordResetEmailProps) => (
  <Html>
    <Head />
    <Preview>Восстановление пароля для вашего аккаунта InvestEx</Preview>
    <Body style={main}>
      <Container style={container}>
        <Section style={logoContainer}>
          <Heading style={h1}>InvestEx</Heading>
        </Section>
        
        <Heading style={h2}>Восстановление пароля</Heading>
        
        <Text style={paragraph}>
          Привет, {firstName}!
        </Text>
        
        <Text style={paragraph}>
          Мы получили запрос на восстановление пароля для вашего аккаунта InvestEx.
          Если это были вы, нажмите на кнопку ниже, чтобы создать новый пароль:
        </Text>

        <Section style={btnContainer}>
          <Button style={button} href={resetUrl}>
            Восстановить пароль
          </Button>
        </Section>

        <Text style={paragraph}>
          Если кнопка не работает, скопируйте и вставьте эту ссылку в ваш браузер:
        </Text>
        
        <Text style={code}>
          {resetUrl}
        </Text>

        <Text style={paragraph}>
          <strong>Важно:</strong> Эта ссылка действительна до {expiresAt}. 
          После этого времени вам потребуется запросить новую ссылку для восстановления пароля.
        </Text>

        <Text style={warningText}>
          Если вы не запрашивали восстановление пароля, просто проигнорируйте это письмо. 
          Ваш пароль останется без изменений.
        </Text>

        <Text style={footer}>
          С уважением,<br />
          Команда InvestEx
        </Text>
      </Container>
    </Body>
  </Html>
);

export default PasswordResetEmail;

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "20px 0 48px",
  maxWidth: "560px",
};

const logoContainer = {
  textAlign: "center" as const,
  marginBottom: "32px",
};

const h1 = {
  color: "#1a365d",
  fontSize: "32px",
  fontWeight: "bold",
  margin: "0",
  textAlign: "center" as const,
};

const h2 = {
  color: "#1a365d",
  fontSize: "24px",
  fontWeight: "normal",
  textAlign: "center" as const,
  margin: "30px 0",
};

const paragraph = {
  color: "#525f7f",
  fontSize: "16px",
  lineHeight: "24px",
  textAlign: "left" as const,
  margin: "16px 0",
};

const btnContainer = {
  textAlign: "center" as const,
  margin: "32px 0",
};

const button = {
  backgroundColor: "#3182ce",
  borderRadius: "8px",
  color: "#fff",
  fontSize: "16px",
  fontWeight: "bold",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "inline-block",
  padding: "12px 32px",
};

const code = {
  display: "inline-block",
  padding: "16px 4.5%",
  width: "90.5%",
  backgroundColor: "#f4f4f4",
  borderRadius: "5px",
  border: "1px solid #eee",
  color: "#333",
  fontSize: "14px",
  wordBreak: "break-all" as const,
};

const warningText = {
  color: "#e53e3e",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left" as const,
  margin: "24px 0",
  padding: "16px",
  backgroundColor: "#fed7d7",
  borderRadius: "8px",
  border: "1px solid #feb2b2",
};

const footer = {
  color: "#8898aa",
  fontSize: "14px",
  lineHeight: "20px",
  textAlign: "left" as const,
  margin: "32px 0 0 0",
};