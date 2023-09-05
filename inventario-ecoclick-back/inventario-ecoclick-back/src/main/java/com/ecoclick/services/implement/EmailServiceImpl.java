package com.ecoclick.services.implement;

import java.io.InputStream;
import java.util.Properties;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.mail.javamail.MimeMessagePreparator;
import org.springframework.stereotype.Service;

import com.ecoclick.services.interfaces.IEmailService;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

@Service
public class EmailServiceImpl implements IEmailService, JavaMailSender {

	private JavaMailSenderImpl mailSender;

	@Override
	public void sendEmail(String to, String subject, String content) {
		mailSender = new JavaMailSenderImpl();
		mailSender.setHost("smtp.gmail.com");
        mailSender.setPort(587);
		mailSender.setUsername("ecoclick.noreply@gmail.com");
		mailSender.setPassword("dkoajctpezwjolqt");
		mailSender.setJavaMailProperties(getMailProperties());
		
		try {
            MimeMessage message = mailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(message, true);
            
            helper.setTo(to);
            helper.setSubject(subject);
            helper.setText(content, true);
            mailSender.send(message);
        } catch (MessagingException e) {
           System.out.println("ERROR: "+e);
        }
    }
	
	private Properties getMailProperties() {
        Properties properties = new Properties();
        properties.put("mail.smtp.auth", "true");
        properties.put("mail.smtp.starttls.enable", "true");
        return properties;
    }

	// Funciones necesarias para implementar JavaMailSender

	@Override
	public void send(SimpleMailMessage simpleMessage) throws MailException {
		// TODO Auto-generated method stub

	}

	@Override
	public void send(SimpleMailMessage... simpleMessages) throws MailException {
		// TODO Auto-generated method stub

	}

	@Override
	public MimeMessage createMimeMessage() {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public MimeMessage createMimeMessage(InputStream contentStream) throws MailException {
		// TODO Auto-generated method stub
		return null;
	}

	@Override
	public void send(MimeMessage mimeMessage) throws MailException {
		// TODO Auto-generated method stub

	}

	@Override
	public void send(MimeMessage... mimeMessages) throws MailException {
		// TODO Auto-generated method stub

	}

	@Override
	public void send(MimeMessagePreparator mimeMessagePreparator) throws MailException {
		// TODO Auto-generated method stub

	}

	@Override
	public void send(MimeMessagePreparator... mimeMessagePreparators) throws MailException {
		// TODO Auto-generated method stub

	}
}
