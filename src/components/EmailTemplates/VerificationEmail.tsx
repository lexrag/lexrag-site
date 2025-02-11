import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Link,
  Preview,
  Section,
  Tailwind,
  Text,
} from '@react-email/components';
import * as React from 'react';

interface VerificationEmailProps {
  userName: string;
  verificationCode: string;
}

const baseUrl = 'https://lexrag.com';

export default function VerificationEmail({
  verificationCode = '{verification_code}',
  userName = '{userName}',
}: VerificationEmailProps) {
  const previewText = `Your LEXRAG verification code is ${verificationCode}`;

  return (
    <Html>
      <Head />
      <Preview>{previewText}</Preview>
      <Tailwind>
        <Body className="bg-white my-auto mx-auto font-sans px-2">
          <Container className="border border-solid border-[#eaeaea] rounded my-[40px] mx-auto p-[20px] max-w-[465px]">
            {/* Логотип */}
            <Section className="mt-[32px]">
              <Img
                src={`${baseUrl}/logo/default.svg`}
                width="120"
                height="24"
                alt="LEXRAG Logo"
                className="my-0 mx-auto"
              />
            </Section>

            {/* Основное сообщение */}
            <Heading className="text-black text-[24px] font-normal text-center p-0 my-[30px] mx-0">
              Verify Your Email Address
            </Heading>

            <Text className="text-black text-[14px] leading-[24px] text-center">
              Hello <strong>{userName}</strong>, thank you for starting the new LEXRAG account
              creation process. We want to make sure it's really you. Please enter the following
              verification code when prompted.
            </Text>

            {/* Код подтверждения */}
            <Section className="text-center mt-[20px] mb-[20px]">
              <Text className="text-black text-[14px] font-bold mb-[5px]">Verification Code</Text>
              <Text className="text-black text-[36px] font-bold">{verificationCode}</Text>
              <Text className="text-gray-500 text-[12px]">(This code is valid for 10 minutes)</Text>
            </Section>

            {/* Кнопка подтверждения */}
            {/* <Section className="text-center mt-[32px] mb-[32px]">
              <Button
                className="bg-[#015a8d] rounded text-white text-[12px] font-semibold no-underline text-center px-5 py-3"
                href="https://lexrag.com/verify"
              >
                Verify Email
              </Button>
            </Section> */}

            {/* Разделительная линия */}
            <Hr className="border border-solid border-[#eaeaea] my-[26px] mx-0 w-full" />

            {/* Информационное сообщение */}
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center">
              LEXRAG will never email you asking for your password, credit card, or banking
              information. If you did not request this email, you can ignore it.
            </Text>

            {/* Футер */}
            <Text className="text-[#666666] text-[12px] leading-[24px] text-center mt-[20px]">
              This message was produced and distributed by <strong>LEXRAG PTE LTD</strong>, <br />
              10 Anson Road #20-05, International Plaza, Singapore, 079903. <br />
              View our{' '}
              <Link href="https://lexrag.com/privacy" className="text-blue-600 no-underline">
                privacy policy
              </Link>
              .
          </Text>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  );
}