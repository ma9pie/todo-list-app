import styled from "@emotion/styled";
import Link from "next/link";
import React, { useEffect } from "react";

import {
  APP_PRIVACY_POLICY_GENERATOR_URL,
  FIREBASE_POLICY_URL,
  SENTRY_PRIVACY_URL,
} from "@/constants";
import useTrackEvent from "@/hooks/useTrackEvent";

const TOSModal = () => {
  const { trackViewModal } = useTrackEvent();

  useEffect(() => {
    trackViewModal("TermsOfService");
  }, []);

  return (
    <Wrapper>
      <Content>
        <Subtitle>Privacy Policy</Subtitle>
        <TextBox>
          <Description>
            ma9pie built the todo-list-app app as open source app. This SERVICE
            is provided by ma9pie at no cost and is intended for use as is. This
            page is used to inform visitors regarding my policies with the
            collection, use, and disclosure of Personal Information if anyone
            decided to use my Service.
          </Description>
          <Description>
            If you choose to use my Service, then you agree to the collection
            and use of information in relation to this policy. The Personal
            Information that I collect is used for providing and improving the
            Service. I will not use or share your information with anyone except
            as described in this Privacy Policy. The terms used in this Privacy
            Policy have the same meanings as in our Terms and Conditions, which
            are accessible at todo-list-app unless otherwise defined in this
            Privacy Policy.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Information Collection and Use</Subtitle>
        <TextBox>
          <Description>
            For a better experience, while using our Service, I may require you
            to provide us with certain personally identifiable information. The
            information that I request will be retained by us and used as
            described in this privacy policy. The app does use third-party
            services that may collect information used to identify you.
          </Description>
          <Description>
            Link to the privacy policy of third-party service providers used by
            the app
          </Description>
          <Ul>
            <Li>
              <Link href={FIREBASE_POLICY_URL} rel="noreferrer" target="_blank">
                Google Analytics for Firebase
              </Link>
            </Li>
            <Li>
              <Link href={SENTRY_PRIVACY_URL} rel="noreferrer" target="_blank">
                Sentry
              </Link>
            </Li>
          </Ul>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Log Data</Subtitle>
        <TextBox>
          <Description>
            I want to inform you that whenever you use my Service, in a case of
            an error in the app I collect data and information (through
            third-party products) on your phone called Log Data. This Log Data
            may include information such as your device Internet Protocol (“IP”)
            address, device name, operating system version, the configuration of
            the app when utilizing my Service, the time and date of your use of
            the Service, and other statistics.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Cookies</Subtitle>
        <TextBox>
          <Description>
            Cookies are files with a small amount of data that are commonly used
            as anonymous unique identifiers. These are sent to your browser from
            the websites that you visit and are stored on your device&apos;s
            internal memory.
          </Description>
          <Description>
            This Service does not use these “cookies” explicitly. However, the
            app may use third-party code and libraries that use “cookies” to
            collect information and improve their services. You have the option
            to either accept or refuse these cookies and know when a cookie is
            being sent to your device. If you choose to refuse our cookies, you
            may not be able to use some portions of this Service.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Service Providers</Subtitle>
        <TextBox>
          <Description>
            I may employ third-party companies and individuals due to the
            following reasons:
          </Description>
          <Ul>
            <Li>To facilitate our Service</Li>
            <Li>To provide the Service on our behalf</Li>
            <Li>To perform Service-related services</Li>
            <Li>To assist us in analyzing how our Service is used</Li>
          </Ul>
          <Description>
            I want to inform users of this Service that these third parties have
            access to their Personal Information. The reason is to perform the
            tasks assigned to them on our behalf. However, they are obligated
            not to disclose or use the information for any other purpose.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Security</Subtitle>
        <TextBox>
          <Description>
            I value your trust in providing us your Personal Information, thus
            we are striving to use commercially acceptable means of protecting
            it. But remember that no method of transmission over the internet,
            or method of electronic storage is 100% secure and reliable, and I
            cannot guarantee its absolute security.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Links to Other Sites</Subtitle>
        <TextBox>
          <Description>
            This Service may contain links to other sites. If you click on a
            third-party link, you will be directed to that site. Note that these
            external sites are not operated by me. Therefore, I strongly advise
            you to review the Privacy Policy of these websites. I have no
            control over and assume no responsibility for the content, privacy
            policies, or practices of any third-party sites or services.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Children’s Privacy</Subtitle>
        <TextBox>
          <Description>
            These Services do not address anyone under the age of 13. I do not
            knowingly collect personally identifiable information from children
            under 13 years of age. In the case I discover that a child under 13
            has provided me with personal information, I immediately delete this
            from our servers. If you are a parent or guardian and you are aware
            that your child has provided us with personal information, please
            contact me so that I will be able to do the necessary actions.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Terms & Conditions</Subtitle>
        <TextBox>
          <Description>
            By downloading or using the app, these terms will automatically
            apply to you - you should make sure therefore that you read them
            carefully before using the app. You’re not allowed to copy or modify
            the app, any part of the app, or our trademarks in any way. You’re
            not allowed to attempt to extract the source code of the app, and
            you also shouldn’t try to translate the app into other languages or
            make derivative versions. The app itself, and all the trademarks,
            copyright, database rights, and other intellectual property rights
            related to it, still belong to ma9pie.
          </Description>
          <Description>
            ma9pie is committed to ensuring that the app is as useful and
            efficient as possible. For that reason, we reserve the right to make
            changes to the app or to charge for its services, at any time and
            for any reason. We will never charge you for the app or its services
            without making it very clear to you exactly what you’re paying for.
          </Description>
          <Description>
            The todo-list-app app stores and processes personal data that you
            have provided to us, to provide my Service. It’s your responsibility
            to keep your phone and access to the app secure. We therefore
            recommend that you do not jailbreak or root your phone, which is the
            process of removing software restrictions and limitations imposed by
            the official operating system of your device. It could make your
            phone vulnerable to malware/viruses/malicious programs, compromise
            your phone’s security features and it could mean that the
            todo-list-app app won’t work properly or at all.
          </Description>
          <Description>
            You should be aware that there are certain things that ma9pie will
            not take responsibility for. Certain functions of the app will
            require the app to have an active internet connection. The
            connection can be Wi-Fi or provided by your mobile network provider,
            but ma9pie cannot take responsibility for the app not working at
            full functionality if you don’t have access to Wi-Fi, and you don’t
            have any of your data allowance left.
          </Description>
          <Description>
            If you’re using the app outside of an area with Wi-Fi, you should
            remember that the terms of the agreement with your mobile network
            provider will still apply. As a result, you may be charged by your
            mobile provider for the cost of data for the duration of the
            connection while accessing the app, or other third-party charges. In
            using the app, you’re accepting responsibility for any such charges,
            including roaming data charges if you use the app outside of your
            home territory (i.e. region or country) without turning off data
            roaming. If you are not the bill payer for the device on which
            you’re using the app, please be aware that we assume that you have
            received permission from the bill payer for using the app.
          </Description>
          <Description>
            Along the same lines, ma9pie cannot always take responsibility for
            the way you use the app i.e. You need to make sure that your device
            stays charged - if it runs out of battery and you can’t turn it on
            to avail the Service, ma9pie cannot accept responsibility.
          </Description>
          <Description>
            With respect to ma9pie’s responsibility for your use of the app,
            when you’re using the app, it’s important to bear in mind that
            although we endeavor to ensure that it is updated and correct at all
            times, we do rely on third parties to provide information to us so
            that we can make it available to you.
          </Description>
          <Description>
            ma9pie accepts no liability for any loss, direct or indirect, you
            experience as a result of relying wholly on this functionality of
            the app.
          </Description>
          <Description>
            At some point, we may wish to update the app. The app is currently
            available on - the requirements for the system(and for any
            additional systems we decide to extend the availability of the app
            to) may change, and you’ll need to download the updates if you want
            to keep using the app. ma9pie does not promise that it will always
            update the app so that it is relevant to you and/or works with the
            version that you have installed on your device. However, you promise
            to always accept updates to the application when offered to you, We
            may also wish to stop providing the app, and may terminate use of it
            at any time without giving notice of termination to you. Unless we
            tell you otherwise, upon any termination, (a) the rights and
            licenses granted to you in these terms will end; (b) you must stop
            using the app, and (if needed) delete it from your device.
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Changes to This Terms and service</Subtitle>
        <TextBox>
          <Description>
            I may update our Terms and service from time to time. Thus, you are
            advised to review this page periodically for any changes. I will
            notify you of any changes by posting the new Terms and service on
            this page. These terms and service are effective as of 2023-09-03
          </Description>
        </TextBox>
      </Content>

      <Content>
        <Subtitle>Contact Us</Subtitle>
        <TextBox>
          <Description>
            If you have any questions or suggestions about my Terms and service,
            do not hesitate to contact me at ma9pie.dev@gmail.com
          </Description>
          <Description>
            This Terms and service page was generated by
            <a
              href={APP_PRIVACY_POLICY_GENERATOR_URL}
              rel="noreferrer"
              target="_blank"
            >
              {" App Privacy Policy Generator"}
            </a>
          </Description>
        </TextBox>
      </Content>
    </Wrapper>
  );
};

export default TOSModal;

const Wrapper = styled.div`
  display: grid;
  gap: 24px;
  a {
    color: var(--blue700);
  }
`;
const Content = styled.div``;
const Subtitle = styled.h3`
  margin-bottom: 8px;
`;
const Description = styled.p`
  font-size: 12px;
  color: var(--sub);
  word-break: break-all;
`;
const TextBox = styled.div`
  display: grid;
  gap: 8px;
`;
const Ul = styled.ul`
  padding-left: 16px;
  list-style-type: disc;
`;
const Li = styled.li`
  font-size: 12px;
  color: var(--sub);
`;
