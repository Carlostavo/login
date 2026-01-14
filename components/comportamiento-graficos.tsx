"use client"

import { useState, useEffect } from "react"
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
  ResponsiveContainer,
} from "recharts"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface GraficosProps {
  datos: any[]
}

const COLORS = [
  { bg: "rgba(255, 99, 132, 0.6)", border: "rgb(255, 99, 132)" },
  { bg: "rgba(54, 162, 235, 0.6)", border: "rgb(54, 162, 235)" },
  { bg: "rgba(255, 206, 86, 0.6)", border: "rgb(255, 206, 86)" },
  { bg: "rgba(75, 192, 192, 0.6)", border: "rgb(75, 192, 192)" },
  { bg: "rgba(153, 102, 255, 0.6)", border: "rgb(153, 102, 255)" },
  { bg: "rgba(255, 159, 64, 0.6)", border: "rgb(255, 159, 64)" },
  { bg: "rgba(16, 185, 129, 0.6)", border: "rgb(16, 185, 129)" },
  { bg: "rgba(244, 63, 94, 0.6)", border: "rgb(244, 63, 94)" },
  { bg: "rgba(99, 102, 241, 0.6)", border: "rgb(99, 102, 241)" },
  { bg: "rgba(251, 191, 36, 0.6)", border: "rgb(251, 191, 36)" },
]

const SOLID_COLORS = [
  "rgb(255, 99, 132)",
  "rgb(54, 162, 235)",
  "rgb(255, 206, 86)",
  "rgb(75, 192, 192)",
  "rgb(153, 102, 255)",
  "rgb(255, 159, 64)",
  "rgb(16, 185, 129)",
  "rgb(244, 63, 94)",
  "rgb(99, 102, 241)",
  "rgb(251, 191, 36)",
]

const SECCIONES = {
  "distribucion-demografica": {
    titulo: "Distribución Demográfica",
    grupos: {
      "grupos-edad": {
        nombre: "Grupos de Edad",
        esGruposEdad: true,
        camposEdad: {
          "0-10 años": "edad_0_10",
          "11-25 años": "edad_11_25",
          "26-50 años": "edad_26_50",
          "51-90 años": "edad_51_90",
        },
      },
      "estado-civil": {
        nombre: "Estado Civil",
        campo: "estado_civil",
        valores: ["Casado", "Soltero", "Divorciado", "Viudo", "Unión libre", "Separado"],
      },
      "nivel-educativo": {
        nombre: "Nivel Educativo",
        campo: "educacion_jefe_hogar",
        valores: ["Primaria", "Secundaria", "Universidad", "Postgrado"],
      },
      "situacion-laboral": {
        nombre: "Situación Laboral",
        campo: "situacion_laboral_jefe_hogar",
        valores: ["Temporal", "Desempleado", "Empleado"],
      },
      "ingreso-mensual": {
        nombre: "Ingreso Mensual",
        campo: "ingreso_mensual_jefe_hogar",
        valores: ["Mayor al sueldo básico", "Menor al sueldo básico", "Sueldo básico"],
      },
      "tipo-hogar": {
        nombre: "Tipo de Hogar",
        campo: "tipo_hogar",
        valores: ["Alquilada", "Prestada", "Propia"],
      },
    },
  },
  "determinantes-socioculturales": {
    titulo: "Determinantes Socioculturales",
    grupos: {
      "conoce-desechos": {
        nombre: "¿Conoce qué son los desechos sólidos domiciliarios?",
        campo: "conoce_desechos_solidos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "comportamiento-adecuado": {
        nombre: "¿Existe comportamiento adecuado en el manejo?",
        campo: "cree_comportamiento_adecuado_manejo",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "separar-desechos": {
        nombre: "¿Se deben separar los desechos por tipo?",
        campo: "separar_desechos_por_origen",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "clasificacion-correcta": {
        nombre: "¿Es importante la clasificación correcta?",
        campo: "clasificacion_correcta_desechos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "comportamiento-comunidad": {
        nombre: "¿El comportamiento comunitario influye en el deterioro?",
        campo: "comportamiento_comunidad_influye",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "dedica-tiempo": {
        nombre: "¿Dedica tiempo a reducir, reutilizar o reciclar?",
        campo: "dedica_tiempo_reducir_reutilizar_reciclar",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "problema-comunidad": {
        nombre: "¿Los desechos son un gran problema?",
        campo: "desechos_solidos_problema_comunidad",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
  "determinantes-afectivos": {
    titulo: "Determinantes Afectivos",
    grupos: {
      "preocupa-exceso": {
        nombre: "¿Le preocupa el exceso de desechos?",
        campo: "preocupa_exceso_desechos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "desechos-contaminan": {
        nombre: "¿Considera que intervienen en consecuencias climáticas?",
        campo: "desechos_contaminan_ambiente",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "afecta-emocionalmente": {
        nombre: "¿Le afecta emocionalmente las noticias de desastres?",
        campo: "afecta_emocionalmente_noticias_contaminacion",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      frustracion: {
        nombre: "¿Siente frustración por falta de acciones?",
        campo: "frustracion_falta_acciones_ambientales",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "planeta-futuro": {
        nombre: "¿Es importante el planeta para futuras generaciones?",
        campo: "importancia_planeta_futuras_generaciones",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
  "determinantes-cognitivos": {
    titulo: "Determinantes Cognitivos",
    grupos: {
      "consciente-impacto": {
        nombre: "¿Es consciente del impacto en el medio ambiente?",
        campo: "consciente_impacto_desechos_salud",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "investiga-temas": {
        nombre: "¿Investiga frecuentemente temas ambientales?",
        campo: "investiga_temas_ambientales",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "consecuencias-acumulacion": {
        nombre: "¿Conoce las consecuencias de la acumulación?",
        campo: "consecuencias_acumulacion_desechos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "beneficios-reutilizar": {
        nombre: "¿Conoce los beneficios de reutilizar?",
        campo: "beneficios_reutilizar_residuo",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "falta-informacion": {
        nombre: "¿La falta de información es un obstáculo?",
        campo: "falta_informacion_obstaculo_gestion",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
  "sustentabilidad-ambiental": {
    titulo: "Sustentabilidad Ambiental",
    grupos: {
      "organicos-funcionalidad": {
        nombre: "¿Los desechos orgánicos tienen otra funcionalidad?",
        campo: "desechos_organicos_funcionalidad",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "acumulacion-salud": {
        nombre: "¿La acumulación afecta la salud?",
        campo: "acumulacion_desechos_afecta_salud",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "reduccion-cuida-ambiente": {
        nombre: "¿La reducción y reciclaje cuida el medio ambiente?",
        campo: "reduccion_reciclaje_reutilizacion_cuida_ambiente",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "transformacion-productos": {
        nombre: "¿La transformación en nuevos productos reduce desechos?",
        campo: "transformacion_desechos_nuevos_productos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "necesita-educacion": {
        nombre: "¿Necesita más información sobre educación ambiental?",
        campo: "necesita_info_educacion_ambiental",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
  "sustentabilidad-economica": {
    titulo: "Sustentabilidad Económica",
    grupos: {
      "separacion-reciclaje": {
        nombre: "¿La separación para reciclaje genera ingreso?",
        campo: "practica_separacion_reciclaje_ingreso",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "desechos-reutilizados": {
        nombre: "¿Los desechos pueden ser reutilizados para nuevos productos?",
        campo: "desechos_hogar_reutilizados",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "manejo-desarrollo": {
        nombre: "¿El manejo adecuado aporta al desarrollo económico?",
        campo: "manejo_adecuado_desechos_aporta_desarrollo",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "emprendimientos-economia": {
        nombre: "¿Los emprendimientos aportan a su economía?",
        campo: "emprendimientos_reutilizacion_aportan_economia",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "oportunidad-emprendimiento": {
        nombre: "¿Ofrece oportunidades para emprendimiento?",
        campo: "manejo_adecuado_desechos_oportunidad_emprendimiento",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
  "desarrollo-comunitario": {
    titulo: "Desarrollo Comunitario",
    grupos: {
      "eventos-concientizacion": {
        nombre: "¿Los eventos de concientización reducen residuos?",
        campo: "reducir_residuos_eventos_concientizacion",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "talleres-practicas": {
        nombre: "¿Participaría en talleres de buenas prácticas?",
        campo: "participaria_talleres_buenas_practicas",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "impacto-ambiente": {
        nombre: "¿El manejo adecuado tiene impacto significativo?",
        campo: "manejo_adecuado_desechos_impacto_ambiente",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalfully de acuerdo"],
      },
      "participar-emprendimiento": {
        nombre: "¿Está dispuesto a participar en emprendimientos?",
        campo: "dispuesto_participar_emprendimiento_desechos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
      "feria-emprendimientos": {
        nombre: "¿Participaría en feria de emprendimientos?",
        campo: "participaria_feria_emprendimientos_desechos",
        valores: ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"],
      },
    },
  },
}

const normalizarValorLikert = (valor: string): string => {
  if (!valor) return ""
  const valorLimpio = valor.trim()

  if (valorLimpio === "Totalmente de acuerdo") return "Totalmente de acuerdo"
  if (valorLimpio === "De acuerdo") return "De acuerdo"
  if (valorLimpio === "Indiferente") return "Indiferente"
  if (valorLimpio === "Desacuerdo") return "Desacuerdo"
  if (valorLimpio === "Totalmente desacuerdo") return "Totalmente desacuerdo"

  return valorLimpio
}

const calcularAnchoEjeY = (datos: any[], esMovil: boolean) => {
  if (esMovil) return 30
  const maxValor = Math.max(...datos.map((d) => d.value))
  const maxDigitos = maxValor.toFixed(0).length
  return Math.max(50, maxDigitos * 8 + 20)
}

const formatearPorcentaje = (valor: number): string => {
  const redondeado = Math.round(valor * 100) / 100
  const esEntero = Math.abs(redondeado - Math.round(redondeado)) < 0.001
  
  if (esEntero) {
    return `${Math.round(redondeado)}%`
  }
  return `${redondeado.toFixed(2)}%`
}

const formatearPorcentajeGrafico = (valor: number): string => {
  const redondeado = Math.round(valor * 10) / 10
  const esEntero = Math.abs(redondeado - Math.round(redondeado)) < 0.01
  
  if (esEntero) {
    return `${Math.round(redondeado)}%`
  }
  return `${redondeado.toFixed(1)}%`
}

// Versión abreviada de las preguntas para tablas
const PREGUNTAS_ABREVIADAS: Record<string, string> = {
  conoce_desechos_solidos: "Conoce desechos sólidos",
  cree_comportamiento_adecuado_manejo: "Comportamiento adecuado",
  separar_desechos_por_origen: "Separar desechos por tipo",
  clasificacion_correcta_desechos: "Clasificación correcta",
  comportamiento_comunidad_influye: "Comportamiento comunitario",
  dedica_tiempo_reducir_reutilizar_reciclar: "Dedica tiempo a reducir",
  desechos_solidos_problema_comunidad: "Desechos son problema",
  preocupa_exceso_desechos: "Preocupa exceso de desechos",
  desechos_contaminan_ambiente: "Desechos contaminan ambiente",
  afecta_emocionalmente_noticias_contaminacion: "Afecta emocionalmente",
  frustracion_falta_acciones_ambientales: "Frustración por falta de acciones",
  importancia_planeta_futuras_generaciones: "Planeta futuro generaciones",
  consciente_impacto_desechos_salud: "Consciente del impacto",
  investiga_temas_ambientales: "Investiga temas ambientales",
  consequencias_acumulacion_desechos: "Conoce consecuencias acumulación",
  beneficios_reutilizar_residuo: "Beneficios reutilizar",
  falta_informacion_obstaculo_gestion: "Falta información obstáculo",
  desechos_organicos_funcionalidad: "Desechos orgánicos funcionalidad",
  acumulacion_desechos_afecta_salud: "Acumulación afecta salud",
  reduccion_reciclaje_reutilizacion_cuida_ambiente: "Reducción cuida ambiente",
  transformacion_desechos_nuevos_productos: "Transformación en productos",
  necesita_info_educacion_ambiental: "Necesita info educación ambiental",
  practica_separacion_reciclaje_ingreso: "Separación genera ingreso",
  desechos_hogar_reutilizados: "Desechos reutilizados",
  manejo_adecuado_desechos_aporta_desarrollo: "Manejo aporta desarrollo",
  emprendimientos_reutilizacion_aportan_economia: "Emprendimientos aportan economía",
  manejo_adecuado_desechos_oportunidad_emprendimiento: "Ofrece oportunidades emprendimiento",
  reducir_residuos_eventos_concientizacion: "Eventos reducen residuos",
  participaria_talleres_buenas_practicas: "Participaría en talleres",
  manejo_adecuado_desechos_impacto_ambiente: "Manejo tiene impacto",
  dispuesto_participar_emprendimiento_desechos: "Dispuesto a participar",
  participaria_feria_emprendimientos_desechos: "Participaría en feria",
}

const generarTablaLikertPorSeccion = (datos: any[], seccionSeleccionada: string) => {
  const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
  if (!seccion || seccionSeleccionada === "distribucion-demografica") return null

  const totalEncuestas = datos.length

  return Object.entries(seccion.grupos).map(([key, grupo]) => {
    const opcionesLikert = ["Totalmente desacuerdo", "Desacuerdo", "Indiferente", "De acuerdo", "Totalmente de acuerdo"]

    const conteos: Record<string, number> = {}
    opcionesLikert.forEach((opcion) => {
      conteos[opcion] = 0
    })

    datos.forEach((registro) => {
      const valor = registro[grupo.campo]
      if (valor && typeof valor === "string") {
        const valorNorm = normalizarValorLikert(valor)
        if (opcionesLikert.includes(valorNorm)) {
          conteos[valorNorm]++
        }
      }
    })

    const suma =
      conteos["Totalmente desacuerdo"] * 1 +
      conteos["Desacuerdo"] * 2 +
      conteos["Indiferente"] * 3 +
      conteos["De acuerdo"] * 4 +
      conteos["Totalmente de acuerdo"] * 5
    const promedio = totalEncuestas > 0 ? (suma / totalEncuestas / 5) * 100 : 0

    return {
      nombreGrupo: grupo.nombre,
      pregunta: PREGUNTAS_ABREVIADAS[grupo.campo as keyof typeof PREGUNTAS_ABREVIADAS] || grupo.nombre,
      conteos,
      totalEncuestas,
      promedio,
    }
  })
}

function ComportamientoGraficos({ datos }: GraficosProps) {
  const [tipoGrafico, setTipoGrafico] = useState<"barras" | "torta" | "lineal">("barras")
  const [seccionSeleccionada, setSeccionSeleccionada] = useState<string>("distribucion-demografica")
  const [grupoSeleccionado, setGrupoSeleccionado] = useState<string>("grupos-edad")
  const [esMovil, setEsMovil] = useState(false)

  useEffect(() => {
    const verificarMovil = () => {
      setEsMovil(window.innerWidth < 768)
    }
    verificarMovil()
    window.addEventListener("resize", verificarMovil)
    return () => window.removeEventListener("resize", verificarMovil)
  }, [])

  const procesarDatos = () => {
    const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
    const grupo = seccion.grupos[grupoSeleccionado as keyof typeof seccion.grupos]

    if (!grupo) return []

    if (grupo.esGruposEdad && grupo.camposEdad) {
      const conteos: Record<string, number> = {}

      Object.entries(grupo.camposEdad).forEach(([label, campo]) => {
        conteos[label] = 0
        datos.forEach((registro) => {
          const valor = Number(registro[campo]) || 0
          if (valor > 0) {
            conteos[label]++
          }
        })
      })

      const total = Object.values(conteos).reduce((sum, val) => sum + val, 0)

      return Object.entries(conteos).map(([name, value]) => ({
        name,
        value,
        porcentaje: total > 0 ? (value / total) * 100 : 0,
      }))
    }

    if (seccionSeleccionada !== "distribucion-demografica" && grupo.valores) {
      const totalEncuestas = datos.length
      const conteos: Record<string, number> = {}

      grupo.valores.forEach((valor) => {
        conteos[valor] = 0
      })

      datos.forEach((registro) => {
        const valor = registro[grupo.campo]
        if (valor && typeof valor === "string") {
          const valorNorm = normalizarValorLikert(valor)
          if (grupo.valores!.includes(valorNorm)) {
            conteos[valorNorm]++
          }
        }
      })

      return Object.entries(conteos).map(([name, value]) => ({
        name,
        value,
        porcentaje: totalEncuestas > 0 ? (value / totalEncuestas) * 100 : 0,
      }))
    }

    const conteos: Record<string, number> = {}
    grupo.valores?.forEach((valor) => {
      conteos[valor] = 0
    })

    datos.forEach((registro) => {
      const valor = registro[grupo.campo]
      if (valor) {
        const valorStr = valor.toString()
        const valorEncontrado = grupo.valores!.find((v) => v.toLowerCase() === valorStr.toLowerCase())
        if (valorEncontrado) {
          conteos[valorEncontrado] = (conteos[valorEncontrado] || 0) + 1
        }
      }
    })

    const total = Object.values(conteos).reduce((sum, val) => sum + val, 0)

    return Object.entries(conteos).map(([name, value]) => ({
      name,
      value,
      porcentaje: total > 0 ? (value / total) * 100 : 0,
    }))
  }

  const generarTablaPorSeccion = () => {
    const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
    if (!seccion) return null

    return Object.entries(seccion.grupos).map(([key, grupo]) => {
      if (grupo.esGruposEdad && grupo.camposEdad) {
        const conteos: Record<string, number> = {}

        Object.entries(grupo.camposEdad).forEach(([label, campo]) => {
          conteos[label] = 0
          datos.forEach((registro) => {
            const valor = Number(registro[campo]) || 0
            if (valor > 0) {
              conteos[label]++
            }
          })
        })

        const total = Object.values(conteos).reduce((sum, val) => sum + val, 0)

        return {
          nombreGrupo: grupo.nombre,
          datos: Object.entries(conteos).map(([name, value]) => ({
            name,
            value,
            porcentaje: total > 0 ? (value / total) * 100 : 0,
          })),
          total,
        }
      }

      const conteos: Record<string, number> = {}
      grupo.valores?.forEach((valor) => {
        conteos[valor] = 0
      })

      datos.forEach((registro) => {
        const valor = registro[grupo.campo]
        if (valor) {
          const valorStr = valor.toString()
          if (seccionSeleccionada !== "distribucion-demografica") {
            const valorNorm = normalizarValorLikert(valorStr)
            const valorEncontrado = grupo.valores!.find((v) => v === valorNorm)
            if (valorEncontrado) {
              conteos[valorEncontrado] = (conteos[valorEncontrado] || 0) + 1
            }
          } else {
            const valorEncontrado = grupo.valores!.find((v) => v.toLowerCase() === valorStr.toLowerCase())
            if (valorEncontrado) {
              conteos[valorEncontrado] = (conteos[valorEncontrado] || 0) + 1
            }
          }
        }
      })

      const total = Object.values(conteos).reduce((sum, val) => sum + val, 0)

      return {
        nombreGrupo: grupo.nombre,
        datos: Object.entries(conteos).map(([name, value]) => ({
          name,
          value,
          porcentaje: total > 0 ? (value / total) * 100 : 0,
        })),
        total,
      }
    })
  }

  const datosGrafico = procesarDatos()
  const tablasSeccion = generarTablaPorSeccion()
  const tablasLikert = generarTablaLikertPorSeccion(datos, seccionSeleccionada)
  const anchoEjeY = calcularAnchoEjeY(datosGrafico, esMovil)
  const margenBarras = esMovil
    ? { top: 20, right: 5, left: 10, bottom: 80 }
    : { top: 30, right: 30, left: anchoEjeY, bottom: 100 }
  const margenLineal = esMovil
    ? { top: 20, right: 5, left: 15, bottom: 80 }
    : { top: 30, right: 30, left: anchoEjeY + 80, bottom: 100 }

  return (
    <div className="space-y-8">
      <Tabs
        value={seccionSeleccionada}
        onValueChange={(value) => {
          setSeccionSeleccionada(value)
          const primeraSeccion = SECCIONES[value as keyof typeof SECCIONES]
          const primerGrupo = Object.keys(primeraSeccion.grupos)[0]
          setGrupoSeleccionado(primerGrupo)
        }}
        className="w-full"
      >
        <TabsList className="w-full flex flex-wrap justify-start h-auto gap-3 bg-muted/50 p-3 rounded-lg">
          {Object.entries(SECCIONES).map(([seccionKey, seccion]) => (
            <TabsTrigger
              key={seccionKey}
              value={seccionKey}
              className="data-[state=active]:bg-primary data-[state=active]:text-white px-4 py-2.5 text-sm whitespace-nowrap"
            >
              {seccion.titulo}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(SECCIONES).map(([seccionKey, seccion]) => (
          <TabsContent key={seccionKey} value={seccionKey} className="mt-6 space-y-8">
            <Card className="p-3 sm:p-4 md:p-6 border border-border">
              <div className="mb-4 sm:mb-6 md:mb-8">
                <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-3 sm:mb-4 md:mb-6">
                  {seccion.titulo}
                </h3>

                <div className="space-y-2 mb-4">
                  <label className="text-sm font-medium text-foreground">Seleccionar Variable</label>
                  <Select value={grupoSeleccionado} onValueChange={setGrupoSeleccionado}>
                    <SelectTrigger className="bg-white border-border text-left w-full">
                      <SelectValue>
                        <div className="pr-4 overflow-hidden text-left">
                          <span className="font-medium text-foreground text-sm sm:text-base whitespace-normal break-words line-clamp-2">
                            {seccion.grupos[grupoSeleccionado as keyof typeof seccion.grupos]?.nombre}
                          </span>
                        </div>
                      </SelectValue>
                    </SelectTrigger>
                    <SelectContent 
                      className="bg-white max-h-[70vh] overflow-y-auto w-[calc(100vw-2rem)] sm:w-full"
                      position="popper"
                    >
                      {Object.entries(seccion.grupos).map(([key, grupo]) => (
                        <SelectItem 
                          key={key} 
                          value={key} 
                          className="py-3 px-4 hover:bg-muted transition-colors"
                        >
                          <div className="flex flex-col">
                            <span className="font-medium text-sm sm:text-base mb-1 text-foreground whitespace-normal break-words leading-tight">
                              {grupo.nombre}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex gap-2 sm:gap-3 flex-wrap">
                  <Button
                    onClick={() => setTipoGrafico("barras")}
                    variant={tipoGrafico === "barras" ? "default" : "outline"}
                    size="sm"
                    className={tipoGrafico === "barras" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
                  >
                    Gráfico de Barras
                  </Button>
                  <Button
                    onClick={() => setTipoGrafico("torta")}
                    variant={tipoGrafico === "torta" ? "default" : "outline"}
                    size="sm"
                    className={tipoGrafico === "torta" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
                  >
                    Gráfico Circular
                  </Button>
                  <Button
                    onClick={() => setTipoGrafico("lineal")}
                    variant={tipoGrafico === "lineal" ? "default" : "outline"}
                    size="sm"
                    className={tipoGrafico === "lineal" ? "bg-primary text-white hover:bg-primary" : "text-xs sm:text-sm"}
                  >
                    Gráfico de Línea
                  </Button>
                </div>
              </div>

              <div className="w-full" style={{ height: esMovil ? "500px" : "500px" }}>
                {tipoGrafico === "barras" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={datosGrafico} margin={margenBarras}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={esMovil ? 100 : 120}
                        fontSize={esMovil ? 9 : 12}
                        tick={{ fill: "#4b5563" }}
                        interval={0}
                      />
                      <YAxis fontSize={esMovil ? 10 : 12} tick={{ fill: "#4b5563" }} width={anchoEjeY} />
                      <Tooltip
                        formatter={(value) => `${value} respuestas`}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          fontSize: esMovil ? "11px" : "14px",
                        }}
                      />
                      <Bar
                        dataKey="value"
                        label={(props: any) => {
                          const { x, y, width, index } = props
                          const porcentaje = datosGrafico[index]?.porcentaje ?? 0
                          return (
                            <text
                              x={x + width / 2}
                              y={y - 8}
                              fill="#1f2937"
                              textAnchor="middle"
                              fontSize={esMovil ? 9 : 12}
                              fontWeight="bold"
                            >
                              {formatearPorcentajeGrafico(porcentaje)}
                            </text>
                          )
                        }}
                        radius={[6, 6, 0, 0]}
                      >
                        {datosGrafico.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length].bg}
                            stroke={COLORS[index % COLORS.length].border}
                            strokeWidth={2}
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                )}

                {tipoGrafico === "torta" && (
                  <div style={{ height: esMovil ? "550px" : "600px" }}>
                    <ResponsiveContainer width="100%" height="100%">
                      <PieChart>
                        <Pie
                          data={datosGrafico}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={(entry: any) => {
                            const porcentaje = entry.porcentaje ?? 0
                            if (esMovil && porcentaje < 5) return ""
                            if (!esMovil && porcentaje < 2) return ""
                            return formatearPorcentajeGrafico(porcentaje)
                          }}
                          outerRadius={esMovil ? 70 : 160}
                          innerRadius={esMovil ? 35 : 80}
                          fill="#8884d8"
                          dataKey="value"
                          paddingAngle={2}
                          activeIndex={undefined}
                          activeShape={{
                            outerRadius: esMovil ? 75 : 170,
                            stroke: "#fff",
                            strokeWidth: 3,
                          }}
                        >
                          {datosGrafico.map((entry, index) => (
                            <Cell
                              key={`cell-${index}`}
                              fill={SOLID_COLORS[index % SOLID_COLORS.length]}
                              stroke="#fff"
                              strokeWidth={2}
                            />
                          ))}
                        </Pie>
                        <Tooltip
                          formatter={(value) => `${value} respuestas`}
                          contentStyle={{
                            backgroundColor: "#fff",
                            border: "1px solid #e5e7eb",
                            borderRadius: "6px",
                            fontSize: esMovil ? "11px" : "14px",
                          }}
                        />
                        <Legend
                          verticalAlign="bottom"
                          height={esMovil ? 180 : 150}
                          wrapperStyle={{
                            paddingTop: esMovil ? "10px" : "20px",
                            fontSize: esMovil ? "8px" : "11px",
                            maxHeight: esMovil ? "180px" : "150px",
                            overflowY: "auto",
                          }}
                          formatter={(value, entry: any) => {
                            const porcentaje = entry.payload?.porcentaje ?? 0
                            return `${value} (${formatearPorcentajeGrafico(porcentaje)})`
                          }}
                        />
                      </PieChart>
                    </ResponsiveContainer>
                  </div>
                )}

                {tipoGrafico === "lineal" && (
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={datosGrafico} margin={margenLineal}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis
                        dataKey="name"
                        angle={-45}
                        textAnchor="end"
                        height={esMovil ? 100 : 120}
                        fontSize={esMovil ? 9 : 12}
                        tick={{ fill: "#4b5563" }}
                        interval={0}
                      />
                      <YAxis fontSize={esMovil ? 10 : 12} tick={{ fill: "#4b5563" }} width={anchoEjeY} />
                      <Tooltip
                        formatter={(value) => `${value} respuestas`}
                        contentStyle={{
                          backgroundColor: "#fff",
                          border: "1px solid #e5e7eb",
                          borderRadius: "6px",
                          fontSize: esMovil ? "11px" : "14px",
                        }}
                      />
                      <Line
                        type="monotone"
                        dataKey="value"
                        stroke="#0ea5e9"
                        dot={(props: any) => {
                          const { cx, cy, payload, index } = props
                          const pointColor = COLORS[index % COLORS.length]
                          return (
                            <g key={`dot-${payload.name}`}>
                              <circle
                                cx={cx}
                                cy={cy}
                                r={esMovil ? 4 : 6}
                                fill={pointColor.bg}
                                stroke="white"
                                strokeWidth={2}
                              />
                              <text
                                x={cx}
                                y={cy - (esMovil ? 18 : 28)}
                                textAnchor="middle"
                                fontSize={esMovil ? 9 : 11}
                                fontWeight="600"
                                fill="#1f2937"
                              >
                                {formatearPorcentajeGrafico(payload.porcentaje)}
                              </text>
                            </g>
                          )
                        }}
                        strokeWidth={esMovil ? 2 : 3}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                )}
              </div>
            </Card>

            <Card className="p-3 sm:p-4 md:p-6 border border-border">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-4 sm:mb-6">
                {seccion.titulo} - Datos Detallados
              </h3>
              <div className="space-y-6 sm:space-y-8">
                {seccionKey === "distribucion-demografica" && tablasSeccion && tablasSeccion.length > 0 && (
                  <div className="space-y-6 sm:space-y-8">
                    {tablasSeccion?.map((tabla, idx) => (
                      <div key={idx}>
                        <h4 className="text-base sm:text-lg font-semibold text-foreground mb-3 sm:mb-4">
                          {tabla.nombreGrupo}
                        </h4>
                        <div className="w-full">
                          <Table className="w-full">
                            <TableHeader>
                              <TableRow>
                                <TableHead className="font-bold text-xs sm:text-sm px-2 py-2 text-left">Categoría</TableHead>
                                <TableHead className="font-bold text-xs sm:text-sm px-2 py-2 text-right">Cantidad</TableHead>
                                <TableHead className="font-bold text-xs sm:text-sm px-2 py-2 text-right">% del Total</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              {tabla.datos.map((fila, idx2) => (
                                <TableRow key={idx2}>
                                  <TableCell className="font-medium text-xs sm:text-sm px-2 py-2">{fila.name}</TableCell>
                                  <TableCell className="text-right text-xs sm:text-sm px-2 py-2">{fila.value}</TableCell>
                                  <TableCell className="text-right text-xs sm:text-sm px-2 py-2">
                                    {formatearPorcentaje(fila.porcentaje)}
                                  </TableCell>
                                </TableRow>
                              ))}
                              <TableRow className="bg-muted/50 font-bold">
                                <TableCell className="text-xs sm:text-sm px-2 py-2">Total</TableCell>
                                <TableCell className="text-right text-xs sm:text-sm px-2 py-2">{tabla.total}</TableCell>
                                <TableCell className="text-right text-xs sm:text-sm px-2 py-2">100%</TableCell>
                              </TableRow>
                            </TableBody>
                          </Table>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {seccionKey !== "distribucion-demografica" && tablasLikert && tablasLikert.length > 0 && (
                  <div className="space-y-6 sm:space-y-8">
                    <div className="w-full">
                      <div className="hidden lg:block">
                        <Table className="w-full table-fixed">
                          <TableHeader>
                            <TableRow>
                              <TableHead className="font-bold text-xs px-2 py-2 w-[200px] min-w-[200px] max-w-[200px]">Pregunta</TableHead>
                              <TableHead className="font-bold text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                TD
                              </TableHead>
                              <TableHead className="font-bold text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">D</TableHead>
                              <TableHead className="font-bold text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">I</TableHead>
                              <TableHead className="font-bold text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">A</TableHead>
                              <TableHead className="font-bold text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                TA
                              </TableHead>
                              <TableHead className="font-bold text-center text-xs bg-muted px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                Prom.
                              </TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {tablasLikert.map((tabla, idx) => (
                              <TableRow key={idx} className="hover:bg-muted/30">
                                <TableCell className="text-xs px-2 py-2 align-top w-[200px] min-w-[200px] max-w-[200px] break-words">
                                  {tabla.pregunta}
                                </TableCell>
                                <TableCell className="text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Totalmente desacuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </TableCell>
                                <TableCell className="text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Desacuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </TableCell>
                                <TableCell className="text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Indiferente"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </TableCell>
                                <TableCell className="text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["De acuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </TableCell>
                                <TableCell className="text-center text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Totalmente de acuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </TableCell>
                                <TableCell className="text-center bg-muted font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                  {formatearPorcentaje(tabla.promedio)}
                                </TableCell>
                              </TableRow>
                            ))}
                            <TableRow className="bg-muted/70">
                              <TableCell className="font-bold text-xs px-2 py-2 w-[200px] min-w-[200px] max-w-[200px]">Promedio General</TableCell>
                              <TableCell className="text-center font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0 && tablasLikert[0].totalEncuestas > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce(
                                        (sum, t) => sum + (t.conteos["Totalmente desacuerdo"] / t.totalEncuestas) * 100,
                                        0,
                                      ) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                              <TableCell className="text-center font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0 && tablasLikert[0].totalEncuestas > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce(
                                        (sum, t) => sum + (t.conteos["Desacuerdo"] / t.totalEncuestas) * 100,
                                        0,
                                      ) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                              <TableCell className="text-center font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0 && tablasLikert[0].totalEncuestas > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce(
                                        (sum, t) => sum + (t.conteos["Indiferente"] / t.totalEncuestas) * 100,
                                        0,
                                      ) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                              <TableCell className="text-center font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0 && tablasLikert[0].totalEncuestas > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce(
                                        (sum, t) => sum + (t.conteos["De acuerdo"] / t.totalEncuestas) * 100,
                                        0,
                                      ) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                              <TableCell className="text-center font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0 && tablasLikert[0].totalEncuestas > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce(
                                        (sum, t) => sum + (t.conteos["Totalmente de acuerdo"] / t.totalEncuestas) * 100,
                                        0,
                                      ) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                              <TableCell className="text-center bg-muted font-bold text-xs px-1 py-2 w-[80px] min-w-[80px] max-w-[80px]">
                                {tablasLikert.length > 0
                                  ? formatearPorcentaje(
                                      tablasLikert.reduce((sum, t) => sum + t.promedio, 0) / tablasLikert.length
                                    )
                                  : "0%"}
                              </TableCell>
                            </TableRow>
                          </TableBody>
                        </Table>
                      </div>

                      <div className="lg:hidden space-y-6">
                        {tablasLikert.map((tabla, idx) => (
                          <div key={idx} className="border rounded-lg p-4 bg-card">
                            <h5 className="font-semibold text-sm mb-4 text-foreground leading-tight">
                              {tabla.pregunta}
                            </h5>
                            <div className="space-y-3">
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-xs font-medium text-muted-foreground">Totalmente Desacuerdo</span>
                                <span className="text-sm font-semibold">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Totalmente desacuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-xs font-medium text-muted-foreground">Desacuerdo</span>
                                <span className="text-sm font-semibold">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Desacuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-xs font-medium text-muted-foreground">Indiferente</span>
                                <span className="text-sm font-semibold">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Indiferente"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-xs font-medium text-muted-foreground">De Acuerdo</span>
                                <span className="text-sm font-semibold">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["De acuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 border-b">
                                <span className="text-xs font-medium text-muted-foreground">Totalmente Acuerdo</span>
                                <span className="text-sm font-semibold">
                                  {tabla.totalEncuestas > 0
                                    ? formatearPorcentaje((tabla.conteos["Totalmente de acuerdo"] / tabla.totalEncuestas) * 100)
                                    : "0%"}
                                </span>
                              </div>
                              <div className="flex justify-between items-center py-2 bg-muted rounded px-3 mt-2">
                                <span className="text-xs font-bold">Promedio</span>
                                <span className="text-sm font-bold">{formatearPorcentaje(tabla.promedio)}</span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  )
}

export { ComportamientoGraficos }
