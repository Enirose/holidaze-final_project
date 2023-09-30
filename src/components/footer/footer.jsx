import "../../styles/custom.scss"
import {Box} from "./footer.styled"

export default function Footer () {
    return (
        <Box>
            <h5 style={{ color: "white", textAlign: "center" }}>
                &copy; {new Date().getFullYear()} Holidaze | Enirose Hellum
            </h5>
        </Box>
  );
};
         