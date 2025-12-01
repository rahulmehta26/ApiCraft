import { Link } from "react-router-dom";
import { motion } from "motion/react";
import { twMerge } from "tailwind-merge";
import { Product, SocialData } from "../../content/footer-data";

const Footer = () => {
  return (
    <footer className="relative border-t-4 border-foreground py-12">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-3 gap-8 md:justify-items-center mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-foreground">API Craft</h3>
            <p className="text-sm font-clash text-muted-foreground leading-relaxed">
              Ship-ready code from any API, faster.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold font-mono text-foreground">Product</h4>
            <ul className="space-y-2">
              {Product?.map(({ href, id, title }) => {
                return (
                  <li key={id}>
                    <Link
                      href={href}
                      className="text-sm font-clash text-muted-foreground hover:text-foreground transition-colors"
                    >
                      {title}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold font-mono text-foreground">Connect</h4>

            <div className="flex gap-4">
              {SocialData?.map(({ Icon, style, id, href }) => {
                return (
                  <motion.a
                    key={id}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover="hover"
                    href={href}
                    className={twMerge(
                      "h-10 w-10 flex items-center justify-center",
                      "border-4 border-foreground bg-background",
                      "hover:text-primary-foreground cursor-pointer ",
                      "transition-colors neo-shadow-hover",
                      style
                    )}
                  >
                    <Icon className="h-5 w-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>
        </div>

        <div className="border-t-4 border-foreground pt-8 text-center">
          <p className="text-sm font-clash text-muted-foreground">
            © 2025 API Craft. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
