import { Link } from "react-router-dom";
import Github from "../icons/github";
import LinkedIn from "../icons/linkedIn";
import Email from "../icons/email";

const Footer = () => {
  return (
    <footer className="relative border-t-4 border-foreground bg-muted/30 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8 justify-items-center mb-8">
          <div className="space-y-4">
            <h3 className="font-bold text-xl text-foreground">API Craft</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Ship-ready code from any API, faster.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold font-mono text-foreground">Product</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  href="#features"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Features
                </Link>
              </li>
              <li>
                <Link
                  href="#preview"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Preview
                </Link>
              </li>
              <li>
                <Link
                  href="#code"
                  className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                >
                  Code Examples
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="font-bold font-mono text-foreground">Connect</h4>
            <div className="flex gap-4">
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center border-4 border-foreground bg-background hover:bg-primary hover:text-primary-foreground transition-colors neo-shadow-hover"
              >
                <Github className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center border-4 border-foreground bg-background hover:bg-info hover:text-primary-foreground transition-colors neo-shadow-hover"
              >
                <LinkedIn className="h-5 w-5" />
              </Link>
              <Link
                href="#"
                className="h-10 w-10 flex items-center justify-center border-4 border-foreground bg-background hover:bg-destructive hover:text-primary-foreground transition-colors neo-shadow-hover"
              >
                <Email className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="border-t-4 border-foreground pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 API Craft. All rights reserved. Built with ❤️ for developers.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
