"use client"
import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Button, 
  Container, 
  Stack, 
  Card, 
  CardContent,
  Avatar,
  IconButton,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { 
  TrendingUp, 
  BookOpen, 
  Users, 
  Star, 
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  Linkedin
} from 'lucide-react';

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  // ✅ Features data fixed
  const features = [
    {
      icon: <TrendingUp className="w-12 h-12 text-blue-600" />,
      title: "Expert Trading Strategies",
      description: "Learn proven trading strategies from industry professionals with years of market experience."
    },
    {
      icon: <BookOpen className="w-12 h-12 text-green-600" />,
      title: "Comprehensive Curriculum",
      description: "From basics to advanced concepts, our structured curriculum covers all aspects of trading."
    },
    {
      icon: <Users className="w-12 h-12 text-purple-600" />,
      title: "Live Trading Sessions",
      description: "Participate in real-time sessions to apply strategies and gain hands-on experience."
    }
  ];

  // ✅ Dummy navigation, courses, testimonials so component doesn’t break
  const navigationItems = ["home", "about", "courses", "testimonials", "contact"];

  const scrollToSection = (id:any) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  const courses = [
    { title: "Beginner Trading", price: "99", duration: "4 weeks", lessons: "12 lessons", description: "Perfect for those new to trading." },
    { title: "Advanced Trading", price: "199", duration: "8 weeks", lessons: "24 lessons", description: "Deep dive into advanced strategies." }
  ];

  const testimonials = [
    { name: "Rohit Kumar", role: "Student", rating: 5, content: "Amazing course!", avatar: "J" },
    { name: "Mohan Yadav", role: "Trader", rating: 4, content: "Very practical and useful.", avatar: "S" }
  ];

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f5f6fa' }}>
      {/* Navigation */}
      <Box sx={{ width: '100%', py: 2, px: 3, bgcolor: 'white', boxShadow: 1, position: 'fixed', top: 0, zIndex: 10 }}>
        <Container maxWidth="lg" sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Typography variant="h6" sx={{ color: 'primary.main', fontWeight: 700 }}>
            Stutor Academy
          </Typography>
          <Stack direction="row" spacing={2}>
            {navigationItems.map((item) => (
              <Button key={item} onClick={() => scrollToSection(item)} sx={{ color: 'text.primary', fontWeight: 500 }}>
                {item}
              </Button>
            ))}
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box id="home" sx={{ pt: 12, pb: 8, bgcolor: 'white' }}>
        <Container maxWidth="md">
          <Stack spacing={5} alignItems="center" textAlign="center">
            <Typography variant="h2" fontWeight={700} color="primary.main">
              Stutor Academy
            </Typography>
            <Typography variant="h6" color="black">
              Empowering students with expert-led trading education. Join us to master the markets and achieve your financial goals.
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center">
              <Button  variant="contained" size="large" sx={{ borderRadius: 3, px: 4 }}>
                Start Learning Today
              </Button>
              <Button variant="outlined" size="large" sx={{ borderRadius: 3, px: 4 }}>
                View Courses
              </Button>
            </Stack>
            <Box sx={{ mt: 4 }}>
              <TrendingUp style={{ width: 96, height: 96, color: '#1976d2', opacity: 0.8 }} />
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Features Section */}
      <Box id="about" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Why Choose Stutor Academy?
            </Typography>
            <Typography variant="h6" color="black" sx={{ maxWidth: 600 }}>
              We provide comprehensive trading education with practical approach and expert guidance
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
              {features.map((feature, index) => (
                <Card key={index} sx={{ minWidth: 220, p: 2, background: 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.95) 100%)', boxShadow: 2 }}>
                  <CardContent sx={{ textAlign: 'center' }}>
                    <Box sx={{ mb: 2 }} color="black">{feature.icon}</Box>
                    <Typography variant="h6" color='black' fontWeight={600} gutterBottom>{feature.title}</Typography>
                    <Typography variant="body2" color="black">{feature.description}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Courses Section */}
      <Box id="courses" sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              Our Courses
            </Typography>
            <Typography variant="h6" color="black" sx={{ maxWidth: 600 }}>
              Choose from our carefully designed courses to match your trading journey
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
              {courses.map((course, index) => (
                <Card key={index} sx={{ minWidth: 220, p: 2, boxShadow: 3 }}>
                  <CardContent>
                    <Stack spacing={2} alignItems="center">
                      <Typography variant="h6" fontWeight={700} color="primary.main">{course.title}</Typography>
                      <Typography variant="h4" fontWeight={700} color="success.main">{course.price}</Typography>
                      <Typography variant="body2" color="black">{course.duration} • {course.lessons}</Typography>
                      <Typography variant="body2" color="black">{course.description}</Typography>
                      <Button variant="contained" sx={{ borderRadius: 2, px: 3 }}>Enroll Now</Button>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box id="testimonials" sx={{ py: 8, bgcolor: 'background.default' }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" fontWeight={700}>
              What Our Students Say
            </Typography>
            <Stack direction={{ xs: 'column', sm: 'row' }} spacing={4} justifyContent="center">
              {testimonials.map((testimonial, index) => (
                <Card key={index} sx={{ minWidth: 220, p: 2, boxShadow: 2 }}>
                  <CardContent>
                    <Stack spacing={2} alignItems="center">
                      <Box>
                        {[...Array(testimonial.rating)].map((_, i) => (
                          <Star color='yellow' key={i} style={{ width: 20, height: 20, color: '#FFD700' }} />
                        ))}
                      </Box>
                      <Typography color='black' variant="body1" fontStyle="italic">"{testimonial.content}"</Typography>
                      <Stack direction="row" spacing={2} alignItems="center">
                        <Avatar sx={{ bgcolor: 'primary.main' }}>{testimonial.avatar}</Avatar>
                        <Box>
                          <Typography color='black' variant="subtitle1" fontWeight={600}>{testimonial.name}</Typography>
                          <Typography variant="body2" color="black">{testimonial.role}</Typography>
                        </Box>
                      </Stack>
                    </Stack>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Contact Section */}
      <Box id="contact" sx={{ py: 8, bgcolor: 'grey.50' }}>
        <Container maxWidth="md">
          <Stack spacing={4} alignItems="center" textAlign="center">
            <Typography variant="h4" fontWeight={700}>Get in Touch</Typography>
            <Typography variant="h6" color="black">
              Ready to start your trading journey? Contact us today and let's discuss how we can help you achieve your financial goals.
            </Typography>
            <Stack spacing={2} alignItems="center">
              <Box display="flex" alignItems="center" gap={1}>
                <Mail style={{ color: '#1976d2' }} />
                <Typography color='black'>info@stutoracademy.com</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <Phone style={{ color: '#43a047' }} />
                <Typography color='black'>+1 (555) 123-4567</Typography>
              </Box>
              <Box display="flex" alignItems="center" gap={1}>
                <MapPin style={{ color: '#e53935' }} />
                <Typography color='black'>123 Trading Street, Financial District</Typography>
              </Box>
            </Stack>
            <Stack direction="row" spacing={2} justifyContent="center">
              <IconButton><Facebook style={{ color: '#1976d2' }} /></IconButton>
              <IconButton><Twitter style={{ color: '#1976d2' }} /></IconButton>
              <IconButton><Instagram style={{ color: '#8e24aa' }} /></IconButton>
              <IconButton><Linkedin style={{ color: '#1976d2' }} /></IconButton>
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ py: 4, bgcolor: 'grey.900', color: 'white' }}>
        <Container maxWidth="md">
          <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" spacing={2}>
            <Typography variant="h6" fontWeight={700}>Stutor Academy</Typography>
            <Typography variant="body2" color="grey.400">© 2024 Stutor Academy. All rights reserved.</Typography>
          </Stack>
        </Container>
      </Box>
    </Box>
  );
}
