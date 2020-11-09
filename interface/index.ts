export interface Usuario_INT {
    readonly id_usuario: string;
    email: string;
    status: string;
    isadmin?: boolean;
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