// app/courses/page.tsx (Courses Page)
import Link from "next/link";
import {
  Clock,
  Award,
  Users,
  Calendar,
  BarChart3,
  Briefcase,
  TrendingUp,
  //   BookOpen,
  CheckCircle,
} from "lucide-react";

const LogoColor = "#052073";

export default function Courses() {
  return (
    <div className="min-h-screen bg-white">
      {/* Courses Hero */}
      <section className="max-w-6xl mx-auto px-6 py-12 md:py-20">
        <div className="max-w-3xl">
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: LogoColor }}
          >
            Our Programs
          </span>
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] text-gray-900 mt-2">
            Practical skills for <br />
            <span style={{ color: LogoColor }}>the real world.</span>
          </h1>
          <p className="mt-6 text-lg text-gray-600 max-w-2xl leading-relaxed">
            Debsphere Academy delivers practical, industry-focused training
            designed to equip learners with the skills, confidence, and
            experience needed to excel in today's competitive workforce.
          </p>
        </div>
      </section>

      {/* Course Listings */}
      <section className="max-w-6xl mx-auto px-6 py-8 space-y-20">
        {/* Excel Course */}
        <div className="grid md:grid-cols-2 gap-12 items-start border-b border-gray-100 pb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6C3CE1]/10 text-[#6C3CE1] mb-4">
              Data &amp; Analytics
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Microsoft Excel Course
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Develop practical Microsoft Excel skills for data analysis,
              reporting, automation, and business productivity. Designed for
              beginners and professionals seeking to improve their analytical
              and workplace efficiency.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock size={16} /> 3 Weeks
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Award size={16} /> Certificate
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Users size={16} /> Online
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-[#6C3CE1]">
              ₦10,000
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 text-sm">
                Learning Outcomes
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                {[
                  "Confidently navigate and use Microsoft Excel",
                  "Clean, organize, and analyze data efficiently",
                  "Create formulas, functions, charts, and dashboards",
                  "Generate professional reports",
                  "Improve workplace productivity using Excel",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-[#6C3CE1] mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#6C3CE1]/5 rounded-2xl p-8 flex items-center justify-center border border-[#6C3CE1]/10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#6C3CE1]/10 flex items-center justify-center mx-auto">
                <BarChart3 size={32} className="text-[#6C3CE1]" />
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                Downloadable Certificate of Completion issued upon successful
                completion.
              </p>
            </div>
          </div>
        </div>

        {/* QuickBooks */}
        <div className="grid md:grid-cols-2 gap-12 items-start border-b border-gray-100 pb-16">
          <div className="order-2 md:order-1 bg-[#6C3CE1]/5 rounded-2xl p-8 flex items-center justify-center border border-[#6C3CE1]/10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#6C3CE1]/10 flex items-center justify-center mx-auto">
                <Briefcase size={32} className="text-[#6C3CE1]" />
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                Certificate of Completion issued upon successful completion.
              </p>
            </div>
          </div>
          <div className="order-1 md:order-2">
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6C3CE1]/10 text-[#6C3CE1] mb-4">
              Finance &amp; Accounting
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              QuickBooks Training
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Master QuickBooks for modern business accounting. Learn how to
              manage financial records, track income and expenses, generate
              financial reports, and perform essential bookkeeping tasks with
              confidence.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock size={16} /> 4 Weeks
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Award size={16} /> Certificate
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Users size={16} /> Online
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-[#6C3CE1]">
              ₦10,000
            </div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 text-sm">
                Learning Outcomes
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                {[
                  "Set up and manage a QuickBooks company file",
                  "Record daily business transactions accurately",
                  "Manage customers, vendors, and inventory",
                  "Generate and interpret financial reports",
                  "Apply QuickBooks skills in business and professional accounting roles",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-[#6C3CE1] mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Stock Market */}
        <div className="grid md:grid-cols-2 gap-12 items-start pb-16">
          <div>
            <div className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-[#6C3CE1]/10 text-[#6C3CE1] mb-4">
              Investing &amp; Wealth
            </div>
            <h2 className="text-3xl font-bold text-gray-900">
              Stock Market Investing Masterclass
            </h2>
            <p className="mt-3 text-gray-600 leading-relaxed">
              Learn how to confidently invest in the stock market by
              understanding how it works, identifying quality stocks, analyzing
              companies, and building a long-term investment portfolio using
              proven investment principles.
            </p>
            <div className="mt-4 flex flex-wrap gap-4 text-sm">
              <span className="flex items-center gap-1.5 text-gray-500">
                <Clock size={16} /> 12 Hours
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Award size={16} /> Certificate
              </span>
              <span className="flex items-center gap-1.5 text-gray-500">
                <Users size={16} /> Online
              </span>
            </div>
            <div className="mt-4 text-2xl font-bold text-[#6C3CE1]">₦5,000</div>
            <div className="mt-4">
              <h4 className="font-semibold text-gray-900 text-sm">
                Learning Outcomes
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-gray-600">
                {[
                  "Buy and sell stocks with confidence",
                  "Identify good stocks to invest in",
                  "Analyze companies using fundamental analysis",
                  "Read and interpret basic stock charts",
                  "Build a diversified investment portfolio",
                  "Develop a long-term wealth creation strategy",
                  "Understand and manage investment risks",
                ].map((item) => (
                  <li key={item} className="flex items-start gap-2">
                    <CheckCircle
                      size={16}
                      className="text-[#6C3CE1] mt-0.5 flex-shrink-0"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="bg-[#6C3CE1]/5 rounded-2xl p-8 flex items-center justify-center border border-[#6C3CE1]/10">
            <div className="text-center">
              <div className="w-20 h-20 rounded-full bg-[#6C3CE1]/10 flex items-center justify-center mx-auto">
                <TrendingUp size={32} className="text-[#6C3CE1]" />
              </div>
              <p className="mt-4 text-gray-500 text-sm">
                Certificate of Completion issued upon successful completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Event Section */}
      <section className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: LogoColor }}
          >
            Event
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            From Skills to <span style={{ color: LogoColor }}>Strategy</span>
          </h2>
          <p className="mt-3 text-gray-500">Building Careers That Matter</p>
        </div>
        <div className="bg-white border border-gray-100 rounded-2xl p-8 md:p-12 shadow-sm max-w-3xl mx-auto">
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1.5">
              <Calendar size={16} /> September 7, 2025
            </span>
            <span className="flex items-center gap-1.5">
              <Users size={16} /> Virtual Webinar
            </span>
          </div>
          <p className="mt-4 text-gray-600 leading-relaxed">
            <strong>
              From Skills to Strategy: Building Careers That Matter
            </strong>{" "}
            was a career development webinar designed to equip students and
            young professionals with the knowledge and strategies needed to
            build meaningful and sustainable careers in the digital age.
          </p>
          <p className="mt-3 text-gray-600 leading-relaxed">
            The session explored how learners can move beyond simply acquiring
            skills to strategically positioning themselves for career growth,
            employability, and long-term success.
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="max-w-6xl mx-auto px-6 py-16 border-t border-gray-100"
      >
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span
            className="text-sm font-medium tracking-wider uppercase"
            style={{ color: LogoColor }}
          >
            Contact
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 text-gray-900">
            Get in <span style={{ color: LogoColor }}>touch</span>
          </h2>
        </div>
        <div className="grid md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            {/* <Mail
              size={24}
              className="mx-auto text-[#6C3CE1] mb-3"
              strokeWidth={1.5}
            /> */}
            <h4 className="font-medium text-gray-900">Email</h4>
            <a
              href="mailto:debsphere005@gmail.com"
              className="text-sm text-gray-500 hover:text-[#6C3CE1] transition-colors"
            >
              debsphere005@gmail.com
            </a>
          </div>
          <div className="bg-white border border-gray-100 rounded-2xl p-6 text-center">
            <Users
              size={24}
              className="mx-auto text-[#6C3CE1] mb-3"
              strokeWidth={1.5}
            />
            <h4 className="font-medium text-gray-900">Social</h4>
            <div className="flex justify-center gap-4 mt-2">
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-[#6C3CE1] transition-colors"
              >
                Instagram
              </a>
              <a
                href="#"
                className="text-sm text-gray-500 hover:text-[#6C3CE1] transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>
        <div className="text-center mt-4 text-sm text-gray-400">
          Phone:{" "}
          <a
            href="tel:08150658570"
            className="hover:text-[#6C3CE1] transition-colors"
          >
            08150658570
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="max-w-6xl mx-auto px-6 py-8 border-t border-gray-100 text-center text-sm text-gray-400">
        <p>
          © 2026 Debsphere Academy — bridging the gap between classroom and
          industry.
        </p>
      </footer>
    </div>
  );
}
