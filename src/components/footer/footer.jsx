import "../../styles/custom.scss"
import {Box, Container, Row, Column, FooterLink, Heading} from "./footer.styled"

export default function Footer () {
    return (
        <Box>
            <h1 style={{ color: "green", 
                        textAlign: "center", 
                        marginTop: "-50px" }}>
                Holidaze
            </h1>
            <Container>
                <Row>
                <Column>
                    <Heading>About Us</Heading>
                    <FooterLink href="#">...</FooterLink>
                    <FooterLink href="#">Vision</FooterLink>
                </Column>
                <Column>
                    <Heading>Services</Heading>
                    <FooterLink href="#">..</FooterLink>
                    <FooterLink href="#">...</FooterLink>
                </Column>
                <Column>
                    <Heading>Contact Us</Heading>
                    <FooterLink href="#">U..</FooterLink>
                    <FooterLink href="#">A...</FooterLink>
                </Column>
                <Column>
                    <Heading>Social Media</Heading>
                    <FooterLink href="#">
                    <i className="fab fa-facebook-f">
                        <span style={{ marginLeft: "10px" }}>
                        Facebook
                        </span>
                    </i>
                    </FooterLink>
                    <FooterLink href="#">
                    <i className="fab fa-instagram">
                        <span style={{ marginLeft: "10px" }}>
                        Instagram
                        </span>
                    </i>
                    </FooterLink>
                    <FooterLink href="#">
                    <i className="fab fa-twitter">
                        <span style={{ marginLeft: "10px" }}>
                        Twitter
                        </span>
                    </i>
                    </FooterLink>
                    <FooterLink href="#">
                    <i className="fab fa-youtube">
                        <span style={{ marginLeft: "10px" }}>
                        Youtube
                        </span>
                    </i>
                    </FooterLink>
                </Column>
                </Row>
            </Container>
        </Box>
    //  <p>&copy; 2023 Tindahan | Enirose Hellum</p>
  );
};
         