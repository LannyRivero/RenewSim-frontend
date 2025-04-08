import React from "react";
import Button from "./Button";
import ButtonGroup from "./ButtonGroup";
import { Trash2, ArrowRight, CheckCircle } from "lucide-react";

const ButtonExamples = () => {
  return (
    <div className="space-y-6 p-6 bg-white dark:bg-gray-800 rounded-xl shadow-lg max-w-md mx-auto">

      <h2 className="text-xl font-bold text-gray-700 dark:text-gray-200 mb-4">
        🚀 Botones Avanzados
      </h2>

      <Button variant="primary">Primary</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="danger">Danger</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="ghost">Ghost</Button>

      <ButtonGroup>
        <Button size="sm">Aceptar</Button>
        <Button variant="outline" size="sm">Cancelar</Button>
      </ButtonGroup>

      <Button isLoading variant="primary">
        Cargando...
      </Button>

      <Button icon={<CheckCircle className="w-4 h-4" />} iconPosition="left">
        Confirmar
      </Button>

      <Button icon={<ArrowRight className="w-4 h-4" />} iconPosition="right">
        Siguiente
      </Button>

      <Button variant="danger" icon={<Trash2 className="w-4 h-4" />} noAnimation size="sm" />

      <Button variant="secondary" disabled>
        Deshabilitado
      </Button>
    </div>
  );
};

export default ButtonExamples;



