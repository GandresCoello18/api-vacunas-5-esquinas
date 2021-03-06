export interface Usuario_INT {
    readonly id_usuario: string;
    email: string;
    status: string;
    isAdmin?: boolean;
    userName: string;
    photoURL: string;
    fecha_registro: string;
}

export interface Paciente_INT {
    readonly id_paciente: string;
    nombres: string;
    apellidos: string;
    nacimiento: string;
    peso: number;
    altura: number;
    temperatura: number;
    codigo: string;
    id_representante: number;
    img: string;
}

export interface Representantes_INT {
    readonly cedula: number;
    nombres: string;
    apellidos: string;
    sexo:string;
}

export interface Discucion_INT {
    readonly id_discucion: string;
    id_usuario: string | undefined;
    asunto: string;
    contenido: string;
    pacientes: Array<string>;
    fecha_discucion?: string;
}

export interface Vacunas_INT {
    readonly id_vacuna: number;
    vacuna_name: string;
    cantidad: number;
}

export interface Comentario_Discucion_INT {
    id_comentario_mencion: string;
    id_usuario: string;
    id_discucion_mencion: string;
    fecha_comentario: string;
    comentario: string;
}

export interface Vacuna_Paciente_INT {
    readonly id_vacuna_paciente: string;
    id_paciente: string;
    id_usuario: string;
    id_vacuna: number;
    fecha_vacuna: string;
    observaciones: string;
}

export interface Peso_Altura_INT {
    id_seguimiento: string;
    peso: number;
    altura: number;
    temperatura: number;
    id_paciente: string;
    fecha_seguimiento?: string;
}

export interface Vacuna_Paciente_Relacionado_INT {
    fecha_vacuna: string;
    observaciones: string;
    id_vacuna_paciente: string;
    id_usuario: string;
    userName: string;
    photoURL: string;
    isAdmin: number | boolean;
    vacuna_name: string;
    peso: number;
    altura: number;
    temperatura: number;
}
