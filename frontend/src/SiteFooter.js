import { Container } from "react-bootstrap";


/** Footer at bottom of page.
 *
 * PettingZoo -> SiteFooter
 *
 **/


function SiteFooter() {
  return (
      <Container fluid={ true } className="bg-primary pt-2 pb-2 mt-5">
        <footer className="container text-white-50 small">
          SQLPettingZoo ©2021 by Joel Burton.
          Lesson content derived from SQLZoo with permission.
          This is free software. ¡Viva la Fluffy!
        </footer>
      </Container>
  );
}

export default SiteFooter;