
const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-green-50 border-t border-gray-200 py-4 px-6 flex flex-col md:flex-row items-center justify-between text-sm text-gray-700">

      <div className="text-center md:text-left mb-2 md:mb-0">
        RENEWSIM © {currentYear}. All rights reserved. <span title="Última actualización de la plataforma">v1.0.0</span>
      </div>


      <div className="flex items-center space-x-4">
        <a
          href="mailto:soporte@renewsim.com"
          className="hover:text-green-600 transition"
          title="Envíanos tus dudas o sugerencias"
        >
          Soporte
        </a>
      </div>
    </footer>
  );
};

export default Footer;





