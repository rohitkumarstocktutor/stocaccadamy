import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Linkedin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-foreground text-background py-16">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold">StockTutor</h3>
            <p className="text-background/80 text-pretty">
              Empowering traders with expert knowledge and proven strategies for stock market success.
            </p>
            <div className="flex gap-4">
              <Facebook className="w-5 h-5 text-background/60 hover:text-background cursor-pointer" />
              <Twitter className="w-5 h-5 text-background/60 hover:text-background cursor-pointer" />
              <Instagram className="w-5 h-5 text-background/60 hover:text-background cursor-pointer" />
              <Linkedin className="w-5 h-5 text-background/60 hover:text-background cursor-pointer" />
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Quick Links</h4>
            <div className="space-y-2">
              <div className="text-background/80 hover:text-background cursor-pointer">About Us</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Courses</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Instructors</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Success Stories</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Blog</div>
            </div>
          </div>

          {/* Support */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Support</h4>
            <div className="space-y-2">
              <div className="text-background/80 hover:text-background cursor-pointer">Help Center</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Contact Us</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Privacy Policy</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Terms of Service</div>
              <div className="text-background/80 hover:text-background cursor-pointer">Refund Policy</div>
            </div>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Contact Info</h4>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-background/60" />
                <span className="text-background/80">support@stocktutor.live</span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-background/60" />
                <span className="text-background/80">+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-background/60" />
                <span className="text-background/80">Mumbai, India</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-background/20 mt-12 pt-8 text-center">
          <p className="text-background/60">© 2024 StockTutor. All rights reserved. | Made with ❤️ for traders</p>
        </div>
      </div>
    </footer>
  )
}
