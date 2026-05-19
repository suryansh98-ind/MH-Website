'use client'

import { motion } from 'framer-motion'
import { fadeInUp, staggerContainer, VIEWPORT } from '../lib/animations'

function SectionHeading({ number, title }: { number?: string; title: string }) {
  return (
    <h2 className="font-junge font-semibold text-[22px] md:text-[26px] text-[#1a1a2e] leading-[1.2] mt-10 mb-4 flex items-start gap-2">
      {number && <span className="text-[#e91e63] shrink-0">{number}.</span>}
      {title}
    </h2>
  )
}

function SubHeading({ title }: { title: string }) {
  return (
    <h3 className="font-junge font-semibold text-[17px] md:text-[19px] text-[#1a1a2e] leading-[1.3] mt-6 mb-2">
      {title}
    </h3>
  )
}

function P({ children }: { children: React.ReactNode }) {
  return (
    <p className="font-figtree text-[15px] md:text-[16px] text-[#4b5563] leading-[1.7] mb-4">
      {children}
    </p>
  )
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  return (
    <ul className="flex flex-col gap-2 mb-4 pl-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-2.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#e91e63] mt-[9px] shrink-0" />
          <span className="font-figtree text-[15px] md:text-[16px] text-[#4b5563] leading-[1.7]">{item}</span>
        </li>
      ))}
    </ul>
  )
}

function Disclaimer({ children }: { children: React.ReactNode }) {
  return (
    <div className="bg-[rgba(233,30,99,0.05)] border border-[rgba(233,30,99,0.15)] rounded-2xl p-5 my-5">
      <p className="font-figtree text-[14px] md:text-[15px] text-[#4b5563] leading-[1.7]">{children}</p>
    </div>
  )
}

function Divider() {
  return <div className="border-t border-[#f3f4f6] my-8" />
}

export default function PrivacyPolicyPage() {
  return (
    <>
      {/* Hero */}
      <section
        className="pt-28 md:pt-36 pb-12 md:pb-16 px-4 md:px-8"
        style={{
          background:
            'radial-gradient(ellipse 900px 600px at 60% 0%, rgba(233,30,99,0.06) 0%, rgba(233,30,99,0) 70%), linear-gradient(to bottom, #ffffff 0%, #fffdf9 100%)',
        }}
      >
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-[800px] mx-auto flex flex-col gap-4"
        >
          <motion.span
            variants={fadeInUp}
            className="font-figtree font-bold text-[12px] text-[#e91e63] tracking-[2.4px] uppercase"
          >
            Legal
          </motion.span>
          <motion.h1
            variants={fadeInUp}
            className="font-junge font-semibold text-[36px] md:text-[56px] text-[#1a1a2e] leading-[1.1]"
          >
            Privacy Policy
          </motion.h1>
          <motion.div variants={fadeInUp} className="flex flex-col sm:flex-row gap-1 sm:gap-6">
            <span className="font-figtree text-[14px] text-[#6b7280]">Effective Date: [Month XX, 2026]</span>
            <span className="font-figtree text-[14px] text-[#6b7280]">Last Updated: [Month XX, 2026]</span>
          </motion.div>
        </motion.div>
      </section>

      {/* Content */}
      <section className="bg-[#fffdf9] py-8 md:py-12 px-4 md:px-8">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={VIEWPORT}
          className="max-w-[800px] mx-auto"
        >
          <motion.div variants={fadeInUp}>
            <P>
              This Privacy Policy explains how Restorative Balance Group, LLC d/b/a MyHormonz and its affiliates
              (collectively, "Company," "we," "us," "our") collect, use, disclose, and protect Personal Data in
              connection with your use of our services, including our mobile application and related websites
              (collectively, the "Services").
            </P>
            <P>
              Please read this Privacy Policy together with any additional notices we may provide at the point of
              collection (for example, in-app disclosures when you upload laboratory hormone reports, log menstrual
              tracking entries, enter body measurements and composition information, or report on diet, sleep, or mood),
              so you understand how and why we use your Personal Data.
            </P>
            <P>
              We keep this Privacy Policy under regular review and may update it from time to time. We will post
              updates in the Services and update the "Last Updated" date. Where required by law, we will provide
              additional notice.
            </P>

            <Divider />

            {/* Section 1 */}
            <SectionHeading number="1" title="Introduction and Who We Are" />
            <P>
              This Privacy Policy covers how we collect and process Personal Data obtained through your use of the
              Services or otherwise shared by you (e.g., contacting support).
            </P>

            <SubHeading title="1.1 The Services" />
            <P>
              The Services are a lifestyle-focused educational platform designed to help users understand hormone
              optimization concepts, including how hormone lab values may compare to reference ranges, and what research
              literature may suggest in general for similar demographic profiles.
            </P>
            <P>
              Users may input or upload information (including photos/images of lab reports) to receive educational
              insights and content. Each time you upload a lab report, you must affirmatively acknowledge an in-app
              disclaimer before the upload will be processed.
            </P>
            <Disclaimer>
              <strong>DISCLAIMER:</strong> We are not a medical provider, and the Services are not medical care. Each
              time you upload a lab report, you will be required to acknowledge an in-app disclaimer confirming, in
              substance, that the information provided through the Services is for educational purposes only, is not
              medical advice, diagnosis, or treatment, and that you should seek the advice of a qualified healthcare
              professional.
            </Disclaimer>

            <SubHeading title="1.2 Controller and Contact" />
            <P>For purposes of U.S. privacy laws, we act as the business/controller responsible for processing Personal Data.</P>
            <P><strong>Privacy Contact:</strong></P>
            <BulletList items={[
              'Email: privacy@company.com',
              'Support: support@company.com',
              'Mail: Company Address, Oregon, USA',
            ]} />
            <P>This Policy applies to:</P>
            <BulletList items={[
              'Individuals who create an account and use the app to input or upload information (including lab results and photos of lab reports);',
              'Individuals who browse educational content; and',
              'Individuals who contact us for support.',
            ]} />

            <Divider />

            {/* Section 2 */}
            <SectionHeading number="2" title="Personal Data We Collect" />
            <P>
              We collect information to provide the Services, secure the platform, and comply with legal obligations.
              The categories below describe the types of Personal Data we may process:
            </P>
            <BulletList items={[
              <><strong>Account Data.</strong> Registration date, subscription status, plan type, account status, and related account administration information.</>,
              <><strong>Contact Data.</strong> Email address; phone number (optional).</>,
              <><strong>Device Data.</strong> Device identifiers (as permitted), device type, operating system, app version, language, time zone, and mobile network information.</>,
              <><strong>IP Data.</strong> IP address and approximate location derived from IP address (not precise GPS unless you explicitly enable a feature requiring it).</>,
              <><strong>Identity Data.</strong> First and last name (or nickname/username), gender, age range, and similar profile identifiers.</>,
              <><strong>Marketing Data.</strong> Communication preferences and marketing opt-in/opt-out status.</>,
              <><strong>Mode / Feature Data.</strong> Information about which features or "modes" you use.</>,
              <><strong>Profile Data.</strong> Feedback, survey responses, and preferences you provide.</>,
            ]} />

            <SubHeading title="2.1 Sensitive Data / Consumer Health Data" />
            <P>
              Because the Services relate to hormone optimization and wellness, certain information you provide may be
              considered Sensitive Personal Information or Consumer Health Data under certain U.S. state laws. This may include:
            </P>
            <BulletList items={[
              'Hormone lab values you input and images of lab reports you upload;',
              'Height, weight, body mass index (BMI), waist circumference, symptoms, stress levels, mood status, wellness history, and hormone-related medications and supplements;',
              'Lifestyle inputs you log (sleep, diet, mental well-being, and menstrual cycle tracking);',
              'Notes/journal content you choose to store in the Services.',
            ]} />
            <P>We treat this category with heightened protections. See Section 8 (US Consumer Health Data Notice).</P>

            <SubHeading title="2.2 Transaction Data" />
            <P>
              Purchases and payment-related metadata. Payment card numbers and billing details are collected and processed by our
              third-party payment processor. We do not store full payment card numbers or billing addresses.
            </P>

            <SubHeading title="2.3 Usage Data" />
            <P>Interactions with the Services (pages/screens viewed, features used, referral URLs, error logs, crash reports, performance data).</P>

            <SubHeading title="2.4 Cookies/SDKs" />
            <P>
              Cookies, SDKs, and similar technologies are used only on our informational website and not within the mobile
              application itself. See Section 3.2 for more detail.
            </P>
            <P>
              <strong>Global Privacy Control:</strong> If you visit our informational website using a supported browser, you can
              use the Global Privacy Control ("GPC") to signal certain opt-out preferences for that browser.
            </P>
            <P>
              <strong>Do Not Track:</strong> We do not currently employ a process for automatically responding to "Do Not Track"
              (DNT) signals. You may opt out of online behavioral ads at{' '}
              <a href="http://www.aboutads.info/choices/" className="text-[#e91e63] hover:underline" target="_blank" rel="noopener noreferrer">
                aboutads.info/choices
              </a>.
            </P>

            <Divider />

            {/* Section 3 */}
            <SectionHeading number="3" title="How We Collect Personal Data" />

            <SubHeading title="3.1 Information You Give Us" />
            <P>We collect Personal Data you provide when you:</P>
            <BulletList items={[
              'Create an account and subscribe;',
              'Enter or upload information (including lab values and lab report images);',
              'Use features (e.g., lifestyle modules, symptom tracking);',
              'Contact support, submit feedback, respond to surveys, or interact with us;',
              'Connect an integration (e.g., Apple HealthKit or wearable devices) — we collect only the data you choose to share.',
            ]} />
            <P>
              Where required by law, we request affirmative consent before processing certain Sensitive/Consumer Health Data.
              In particular, each time you upload a lab report, you must affirmatively acknowledge the in-app disclaimer before the
              upload will be processed.
            </P>

            <SubHeading title="3.2 Information We Automatically Collect" />
            <P>
              When you use the Services, we automatically collect certain Device Data including browser type, IP address,
              time zone, and cookies. We may use cookies, log files, web beacons, tags, and pixels to collect this information.
            </P>
            <P>We use essential, functional, performance, and marketing cookies for the following purposes:</P>
            <div className="overflow-x-auto mb-4">
              <table className="w-full border-collapse text-[14px] font-figtree">
                <thead>
                  <tr className="bg-[rgba(233,30,99,0.06)]">
                    <th className="text-left p-3 font-semibold text-[#1a1a2e] border border-[#f3f4f6] w-1/3">Purpose</th>
                    <th className="text-left p-3 font-semibold text-[#1a1a2e] border border-[#f3f4f6]">Explanation</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Processes', 'Intended to make the Services work in the way you expect.'],
                    ['Authentication, Security, and Compliance', 'Intended to prevent fraud, protect your data from unauthorized parties, and comply with legal requirements.'],
                    ['Preferences', 'Intended to remember information about how you prefer to interact with the Services.'],
                    ['Analytics', 'Intended to help us understand how visitors use the Services in order to improve them.'],
                  ].map(([purpose, explanation]) => (
                    <tr key={purpose} className="even:bg-[#fafafa]">
                      <td className="p-3 text-[#1a1a2e] font-medium border border-[#f3f4f6] align-top">{purpose}</td>
                      <td className="p-3 text-[#4b5563] border border-[#f3f4f6]">{explanation}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <SubHeading title="3.3 Information We Receive from Service Providers" />
            <P>We may receive certain data from vendors that help us operate the Services, such as analytics and crash reporting providers, payment providers, and security and fraud-prevention vendors.</P>

            <Divider />

            {/* Section 4 */}
            <SectionHeading number="4" title="How We Use Personal Data" />
            <BulletList items={[
              <><strong>4.1 To enable and provide the Services</strong> — administer accounts, maintain functionality, and deliver educational insights.</>,
              <><strong>4.2 Account administration</strong> — set up accounts, troubleshoot, send service-related notices, and provide in-app support.</>,
              <><strong>4.3 Educational insights</strong> — display reference ranges and provide research-based context from inputs you provide. These outputs are for educational purposes only and are not medical advice.</>,
              <><strong>4.4 Service quality and development</strong> — understand how users engage with the Services and improve features, using aggregation and de-identification where feasible.</>,
              <><strong>4.5 Customer support</strong> — process Personal Data you provide in support communications.</>,
              <><strong>4.6 Purchases and subscriptions</strong> — process subscriptions and purchases, including fraud prevention.</>,
              <><strong>4.7 Marketing</strong> — if you opt in, send newsletters, product updates, promotions, and educational content. You can opt out at any time.</>,
              <><strong>4.8 Targeted advertising</strong> — we do not use Consumer Health Data for targeted advertising.</>,
              <><strong>4.9 Legal obligations</strong> — comply with applicable laws, respond to lawful requests, protect against fraud, and enforce our Terms.</>,
            ]} />

            <Divider />

            {/* Section 5 */}
            <SectionHeading number="5" title="How Long We Keep Personal Data" />
            <P>We retain Personal Data as long as necessary to fulfill the purposes described in this Privacy Policy, including providing the Services, complying with legal obligations, resolving disputes, and enforcing agreements.</P>

            <div className="overflow-x-auto mb-6">
              <table className="w-full border-collapse text-[13px] md:text-[14px] font-figtree">
                <thead>
                  <tr className="bg-[rgba(233,30,99,0.06)]">
                    <th className="text-left p-3 font-semibold text-[#1a1a2e] border border-[#f3f4f6]">Category</th>
                    <th className="text-left p-3 font-semibold text-[#1a1a2e] border border-[#f3f4f6]">Retention Period</th>
                    <th className="text-left p-3 font-semibold text-[#1a1a2e] border border-[#f3f4f6] whitespace-nowrap">Sold or Shared?</th>
                  </tr>
                </thead>
                <tbody>
                  {[
                    ['Account Data', 'Duration of account plus a reasonable post-termination period', 'No'],
                    ['Contact Data', 'Duration of account; marketing contacts retained until opt-out', 'No'],
                    ['Device / IP Data', 'Duration of account', 'Certain identifiers may be disclosed to analytics/advertising partners'],
                    ['Identity Data', 'Duration of account plus a reasonable post-termination period', 'No'],
                    ['Marketing Data', 'Until opt-out or account deletion', 'No'],
                    ['Mode / Feature Data', 'Duration of account', 'No'],
                    ['Profile Data', 'Duration of account', 'No'],
                    ['Sensitive Data / Consumer Health Data', 'Duration of account; deleted upon request (subject to legal exceptions)', 'No'],
                    ['Transaction Data', 'As required for tax, accounting, and dispute resolution', 'No'],
                    ['Usage Data', 'Up to 24 months from collection', 'Certain identifiers may be disclosed to analytics/advertising partners'],
                    ['Support Communications', 'Up to 36 months from resolution', 'No'],
                    ['Security Logs', 'Up to 12 months from collection', 'No'],
                  ].map(([category, period, shared]) => (
                    <tr key={category} className="even:bg-[#fafafa]">
                      <td className="p-3 text-[#1a1a2e] font-medium border border-[#f3f4f6] align-top">{category}</td>
                      <td className="p-3 text-[#4b5563] border border-[#f3f4f6] align-top">{period}</td>
                      <td className="p-3 text-[#4b5563] border border-[#f3f4f6] align-top">{shared}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <Divider />

            {/* Section 6 */}
            <SectionHeading number="6" title="Disclosures of Personal Data" />
            <SubHeading title="6.1 Recipients" />
            <P>We may disclose Personal Data:</P>
            <BulletList items={[
              'To service providers that help us operate the Services (hosting, security, analytics, customer support, payment processing);',
              'To affiliates, including our parent entity Restorative Balance Group, LLC;',
              'To a successor or acquiring entity in connection with a merger, acquisition, or other corporate transaction;',
              'To third parties you direct us to share with (e.g., integrations you enable);',
              'To comply with legal process;',
              'To protect rights, safety, and security.',
            ]} />

            <SubHeading title="6.2 Legal Process and Government Requests" />
            <P>We will disclose personally identifying information in response to third-party requests only if required by valid legal process. Where legally permitted, we may seek to narrow requests, provide advance notice to you, and seek confidentiality protections.</P>

            <SubHeading title="6.3 Payment Service Providers" />
            <P>Payment information is handled by payment processors or app stores. We do not store full payment card numbers. Their processing is governed by their own privacy policies.</P>

            <SubHeading title="6.4 California Medical Privacy Rights" />
            <P>To the extent California's Confidentiality of Medical Information Act ("CMIA") applies, we do not disclose your medical information to third parties without your authorization unless permitted or required by the CMIA or other applicable law.</P>

            <Divider />

            {/* Section 7 */}
            <SectionHeading number="7" title="How We Protect Personal Data" />
            <P>We use reasonable administrative, technical, and organizational safeguards designed to protect Personal Data, including encryption in transit (TLS/HTTPS) and at rest, secure storage controls, access control and least-privilege practices, audit logging, security monitoring, vulnerability management, and employee training.</P>
            <P>No system is 100% secure. Please use a strong password and protect your account credentials.</P>

            <Divider />

            {/* Section 8 */}
            <SectionHeading number="8" title="Third-Party Links" />
            <P>The Services may contain links to third-party websites or services. We are not responsible for the privacy practices of those third parties. We encourage you to review their privacy policies before sharing Personal Data.</P>

            <Divider />

            {/* Section 9 */}
            <SectionHeading number="9" title="Age Restriction" />
            <P>The Services are restricted to individuals 18 years of age or older. We do not knowingly collect Personal Data from anyone under 18. If you believe we may have collected information from a user under 18, please contact us at privacy@company.com.</P>

            <Divider />

            {/* Section 10 */}
            <SectionHeading number="10" title="Your Rights and Choices" />
            <SubHeading title="10.1 General Rights" />
            <P>Depending on where you live, you may have rights to:</P>
            <BulletList items={[
              'Request access to and information about your Personal Data;',
              'Request correction of inaccurate or incomplete Personal Data;',
              'Request deletion of Personal Data;',
              'Request restrictions on certain processing where applicable;',
              'Request a portable copy of certain Personal Data;',
              'Opt out of targeted advertising and certain "sale"/"sharing" disclosures where applicable;',
              'Withdraw consent where processing is based on consent.',
            ]} />

            <SubHeading title="10.2 How to Exercise Rights" />
            <P>You may submit requests within the app by navigating to <strong>Settings → Privacy → Privacy Requests</strong>, or via email at privacy@company.com.</P>

            <SubHeading title="10.3 Authorized Agents" />
            <P>If you are a California resident, you may designate an authorized agent to submit a privacy request on your behalf. The authorized agent must provide written authorization or a power of attorney.</P>

            <SubHeading title="10.4 Marketing Choices" />
            <P>You may opt out of marketing emails via the unsubscribe link, in-app settings, or by contacting us.</P>

            <Divider />

            {/* Section 11 */}
            <SectionHeading number="11" title="International Transfers" />
            <P>The Services are intended for U.S. users, and our infrastructure and operations are based in the United States. We do not currently use vendors that process your Personal Data outside the United States.</P>

            <Divider />

            {/* Section 12 */}
            <SectionHeading number="12" title="HIPAA" />
            <P>Our Services are generally not subject to HIPAA. While we may process health-related information, we are not a "Covered Entity" or "Business Associate" for purposes of HIPAA based on the current product design. Even where HIPAA does not apply, we comply with applicable U.S. consumer health and privacy laws.</P>

            <Divider />

            {/* Section 13 */}
            <SectionHeading number="13" title="California and Other U.S. State Privacy Disclosures" />
            <P>At or before the point of collection, California consumers are entitled to notice of the categories of personal information we collect, the purposes for which we collect and use them, whether each category is sold or shared, and the retention period. See Sections 2, 4, and 5 of this Privacy Policy.</P>

            <SubHeading title="13.1 U.S. State Consumer Requests" />
            <P>Subject to applicable law, you may request to Know/Access, Correct, Delete, Opt-out of targeted advertising, or Limit Sensitive PI use.</P>

            <SubHeading title="Oregon Consumer Privacy Act (OCPA)" />
            <P>If you are an Oregon resident, you may have additional rights under the OCPA, including the right to know, correct, delete, and obtain a copy of your Personal Data, and the right to opt out of targeted advertising. To exercise your rights, see Section 10.2. Appeals may be directed to privacy@company.com with the subject "Privacy Appeal."</P>

            <SubHeading title="13.2 How to Submit Requests and Verification" />
            <P>Submit requests via email at privacy@company.com or through the in-app request tool at <strong>Settings → Privacy → Privacy Requests</strong>. We will verify your identity consistent with the sensitivity of the data and applicable law.</P>

            <SubHeading title="13.3 Appeals" />
            <P>If we decline to take action on a request, you may appeal by contacting privacy@company.com with the subject "Privacy Appeal." If your appeal is denied, you may have the right to contact your state Attorney General.</P>

            <SubHeading title="13.4 Non-Discrimination" />
            <P>We will not unlawfully discriminate against you for exercising your privacy rights.</P>

            <Divider />

            {/* Section 14 */}
            <SectionHeading number="14" title="Contact Us" />
            <BulletList items={[
              'Email: privacy@company.com / dpo@company.com',
              'Mail: Company Address, Oregon, USA',
            ]} />

            <Divider />

            {/* US Consumer Health Data Notice */}
            <div className="bg-[rgba(233,30,99,0.04)] border border-[rgba(233,30,99,0.12)] rounded-3xl p-6 md:p-10 mt-8">
              <span className="font-figtree font-bold text-[12px] text-[#e91e63] tracking-[2.4px] uppercase">Appendix</span>
              <h2 className="font-junge font-semibold text-[22px] md:text-[28px] text-[#1a1a2e] leading-[1.2] mt-3 mb-2">
                US Consumer Health Data Notice
              </h2>
              <p className="font-figtree text-[13px] text-[#6b7280] mb-6">
                (WA MHMDA / Similar Laws) — Last Updated: [Month XX, 2026]
              </p>
              <P>
                This US Consumer Health Data Notice applies to U.S. residents whose Consumer Health Data we process under
                U.S. state consumer health privacy laws, including (where applicable) the Washington My Health My Data Act.
                It supplements the Privacy Policy.
              </P>
              <P>
                <strong>"Consumer Health Data"</strong> means Personal Data that is linked or reasonably linkable to a consumer
                and that identifies the consumer's past, present, or future physical or mental health status, including
                reproductive and hormone-related data.
              </P>

              <SubHeading title="1. Categories of Consumer Health Data We Collect and Purposes" />
              <P>Categories may include:</P>
              <BulletList items={[
                'Hormone lab values you enter;',
                'Images/photos of lab reports you upload;',
                'Symptoms, height, weight, BMI, waist circumference, stress levels, mood status, sleep, diet, mental well-being, menstrual cycle tracking, and hormone-related medications and supplements;',
                'Health-related notes you choose to store in the Services.',
              ]} />
              <P>Purposes include providing educational insights, maintaining account functionality, security and fraud prevention, and service improvements.</P>

              <SubHeading title="2. Sources of Consumer Health Data" />
              <P>We collect Consumer Health Data directly from you and/or from devices or integrations you authorize.</P>

              <SubHeading title="3. Disclosures of Consumer Health Data" />
              <P>We may disclose Consumer Health Data to service providers under contract, affiliates, a successor entity in connection with a corporate transaction, with your consent, or as required by law. We do not sell Consumer Health Data for monetary consideration.</P>

              <SubHeading title="4. Consumer Health Data Requests" />
              <P>Subject to applicable law, you may request to confirm, access, receive a list of disclosures, delete, or withdraw consent for your Consumer Health Data.</P>
              <P>
                <strong>How to submit:</strong> Email privacy@company.com or use the in-app Privacy Requests tool at
                Settings → Privacy → Privacy Requests.
              </P>
              <P>
                <strong>Appeals:</strong> Email privacy@company.com with subject "Consumer Health Data Appeal." If an appeal is
                unsuccessful and you are a Washington resident, you may contact the Washington State Attorney General.
              </P>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  )
}
