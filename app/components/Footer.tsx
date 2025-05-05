

export default function Footer() {
  return (
    <footer className="bg-gray-800 border-t border-gray-700">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold text-blue-400">JobFit AI</h3>
            <p className="text-gray-400">
              Your AI-powered job search assistant helping you land more interviews.
            </p>
            <div className="flex space-x-4">
              {['twitter', 'linkedin', 'github'].map((social) => (
                <a key={social} href="#" className="text-gray-400 hover:text-blue-400 transition-colors">
                  <span className="sr-only">{social}</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    {/* Add your social icons here */}
                  </svg>
                </a>
              ))}
            </div>
          </div>

          {/* Links Columns */}
          {[
            {
              title: "Product",
              links: ["Features", "How It Works", "Pricing", "Demo"]
            },
            {
              title: "Resources",
              links: ["Blog", "Resume Tips", "Career Guide", "FAQ"]
            },
            {
              title: "Company",
              links: ["About Us", "Contact", "Careers", "Privacy Policy"]
            }
          ].map((column, index) => (
            <div key={index} className="space-y-4">
              <h4 className="text-lg font-semibold text-white">{column.title}</h4>
              <ul className="space-y-2">
                {column.links.map((link, i) => (
                  <li key={i}>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-blue-400 transition-colors"
                    >
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} JobFit AI. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Terms of Service
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-gray-500 hover:text-blue-400 text-sm transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}