import {
    Accordion,
    AccordionSummary,
    AccordionDetails,
    Typography,
    Box,
  } from '@mui/material';
  import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
  
  const faqs = [
    {
      question: 'What are your opening hours?',
      answer: 'We are open 7 days a week from 11:00 AM to 11:00 PM.',
    },
    {
      question: 'Do you offer vegetarian options?',
      answer: 'Yes! We offer a variety of vegetarian dishes. Just let our staff know!',
    },
    {
      question: 'Can I place an order for pickup?',
      answer: 'Absolutely. You can place pickup orders directly on our website.',
    },
    {
      question: 'Do you offer delivery?',
      answer: 'Yes! We currently offer delivery through DoorDash and Uber Eats. Just search for Mezquite Valley Street Tacos and More on either app to place your order easily.',
    },
    {
      question: 'Do you offer dine-in seating?',
      answer: 'Yes! Even though we’re a food truck, we have a shaded tables set up in front of the truck so guests can enjoy their food on-site.',
    },
    
  ];
  
  const FAQSection = () => {
    return (
      <Box
        sx={{
          px: { xs: 2, md: 8 },
          py: 8,
          backgroundColor: '#111',
          color: '#fff',
        }}
      >
        <Typography
          variant="h4"
          fontWeight="bold"
          textAlign="center"
          mb={4}
        >
          Frequently Asked Questions
        </Typography>
  
        {faqs.map((faq, index) => (
          <Accordion
            key={index}
            sx={{
              backgroundColor: '#1c1c1c',
              color: '#fff',
              mb: 2,
              boxShadow: 'none',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              '&:before': { display: 'none' },
            }}
          >
            <AccordionSummary expandIcon={<ExpandMoreIcon sx={{ color: '#fff' }} />}>
              <Typography fontWeight="medium">{faq.question}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Typography variant="body2" color="#ccc">
                {faq.answer}
              </Typography>
            </AccordionDetails>
          </Accordion>
        ))}
      </Box>
    );
  };
  
  export default FAQSection;
  