"use client"

import React, { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Download, ImageIcon, X, Filter, FileText, Eye, FileSpreadsheet, FileImage, Settings2 } from "lucide-react"
import { BarChart3, PieChartIcon, TrendingUp, FileJson } from "lucide-react"
import { toPng, toJpeg, toSvg } from 'html-to-image'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import { GraficoReusable } from "@/components/reportes/grafico-reusable"

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

// Definición completa de secciones con nombres completos de preguntas
const SECCIONES = {
  "distribucion-demografica": {
    titulo: "Distribución Demográfica",
    campos: [
      { key: "estado_civil", label: "Estado Civil" },
      { key: "educacion_jefe_hogar", label: "Nivel de educación del jefe del hogar" },
      { key: "situacion_laboral_jefe_hogar", label: "Situación laboral del jefe del hogar" },
      { key: "ingreso_mensual_jefe_hogar", label: "Ingreso estimado mensual del jefe del hogar" },
      { key: "tipo_hogar", label: "Tipo de hogar" },
    ],
  },
  "determinantes-socioculturales": {
    titulo: "Determinantes Socioculturales",
    campos: [
      { key: "conoce_desechos_solidos", label: "¿Conoce usted qué son los desechos sólidos domiciliarios?" },
      { key: "cree_comportamiento_adecuado_manejo", label: "¿Cree usted que existe un comportamiento adecuado en el manejo de los desechos sólidos domiciliarios en la comunidad?" },
      { key: "separar_desechos_por_origen", label: "¿Se debe separar los desechos sólidos según su tipo (papel - plástico - orgánico - inorgánico)?" },
      { key: "clasificacion_correcta_desechos", label: "¿Es importante la correcta clasificación de los desechos sólidos orgánicos e inorgánicos en el hogar?" },
      { key: "comportamiento_comunidad_influye", label: "¿Cree que el comportamiento de la comunidad influye en deterioro del medio ambiente?" },
      { key: "dedica_tiempo_reducir_reutilizar_reciclar", label: "¿Dedica tiempo para reducir, reutilizar y/o reciclar los desechos sólidos que se generan en el hogar?" },
      { key: "desechos_solidos_problema_comunidad", label: "¿Los desechos sólidos son un gran problema para la comunidad?" },
    ],
  },
  "determinantes-afectivos": {
    titulo: "Determinantes Afectivos",
    campos: [
      { key: "preocupa_exceso_desechos", label: "¿Le preocupa el exceso de desechos sólidos domiciliarios?" },
      { key: "desechos_contaminan_ambiente", label: "¿Considera que los desechos sólidos domiciliarios intervienen en las consecuencias climáticas?" },
      { key: "afecta_emocionalmente_noticias_contaminacion", label: "¿Le afecta emocionalmente cuando escucha noticias acerca de los desastres naturales?" },
      { key: "frustracion_falta_acciones_ambientales", label: "¿Siente frustración debido a la falta de acciones significativas para abordar la generación de los desechos sólidos?" },
      { key: "importancia_planeta_futuras_generaciones", label: "¿Considera importante pensar en el tipo de planeta que dejaremos a las futuras generaciones?" },
    ],
  },
  "determinantes-cognitivos": {
    titulo: "Determinantes Cognitivos",
    campos: [
      { key: "consciente_impacto_desechos_salud", label: "¿Es consciente del impacto de los desechos sólidos domiciliarios en el medio ambiente?" },
      { key: "investiga_temas_ambientales", label: "¿Investiga frecuentemente acerca de temas medio ambientales?" },
      { key: "consecuencias_acumulacion_desechos", label: "¿Conoce las consecuencias de la acumulación de los desechos sólidos domiciliarios?" },
      { key: "beneficios_reutilizar_residuo", label: "¿Conoce los beneficios de reutilizar un residuo domiciliario?" },
      { key: "falta_informacion_obstaculo_gestion", label: "¿La falta de información es un obstáculo para la correcta gestión de los residuos sólidos domiciliario?" },
    ],
  },
  "sustentabilidad-ambiental": {
    titulo: "Sustentabilidad Ambiental",
    campos: [
      { key: "desechos_organicos_funcionalidad", label: "¿Los desechos orgánicos generados en el hogar pueden tener otra funcionalidad?" },
      { key: "acumulacion_desechos_afecta_salud", label: "¿La acumulación de desechos afectan a la salud de la población?" },
      { key: "reduccion_reciclaje_reutilizacion_cuida_ambiente", label: "¿La reducción, reciclaje y la reutilización de los desechos sólidos puede cuidar al medio ambiente y a la vida silvestre?" },
      { key: "transformacion_desechos_nuevos_productos", label: "¿Cree que la transformación de desechos sólidos en nuevos productos puede contribuir significativamente a la reducción de la generación de desechos?" },
      { key: "necesita_info_educacion_ambiental", label: "¿Necesita más información acerca de educación ambiental?" },
    ],
  },
  "sustentabilidad-economica": {
    titulo: "Sustentabilidad Económica",
    campos: [
      { key: "practica_separacion_reciclaje_ingreso", label: "¿En su hogar practica la separación de los desechos para el reciclaje y le representa algún ingreso?" },
      { key: "desechos_hogar_reutilizados", label: "¿Los desechos sólidos generados en el hogar pueden ser reutilizados para una nueva función o creación de un producto?" },
      { key: "manejo_adecuado_desechos_aporta_desarrollo", label: "¿Cree que el manejo adecuado de los desechos sólidos domiciliarios podría aportar al desarrollo económico comunitario?" },
      { key: "emprendimientos_reutilizacion_aportan_economia", label: "¿Los emprendimientos en base a la reutilización de los desechos aporta a su economía?" },
      { key: "manejo_adecuado_desechos_oportunidad_emprendimiento", label: "¿El manejo adecuado de los desechos sólidos domiciliarios ofrece oportunidades para el emprendimiento?" },
    ],
  },
  "desarrollo-comunitario": {
    titulo: "Desarrollo Comunitario",
    campos: [
      { key: "reducir_residuos_eventos_concientizacion", label: "¿Es posible reducir la generación de residuos sólidos domiciliarios por medio de eventos de concientización?" },
      { key: "participaria_talleres_buenas_practicas", label: "¿Participaría en talleres de buenas prácticas y capacitaciones para el correcto manejo de los desechos sólidos domiciliarios?" },
      { key: "manejo_adecuado_desechos_impacto_ambiente", label: "¿El manejo adecuado de los desechos sólidos domiciliarios puede tener un impacto significativo al medio ambiente?" },
      { key: "dispuesto_participar_emprendimiento_desechos", label: "¿Está dispuesto a participar en un emprendimiento en base al uso de los desechos sólidos?" },
      { key: "participaria_feria_emprendimientos_desechos", label: "¿Participaría a una feria de emprendimientos comunitarios en base a desechos domiciliarios reutilizados?" },
    ],
  },
}

// Nombres correctos para campos de la base de datos
const NOMBRES_CAMPOS_DB: Record<string, string> = {
  id: "ID",
  estado_civil: "Estado Civil",
  educacion_jefe_hogar: "Nivel de Educación del Jefe del Hogar",
  situacion_laboral_jefe_hogar: "Situación Laboral del Jefe del Hogar",
  ingreso_mensual_jefe_hogar: "Ingreso Mensual del Jefe del Hogar",
  tipo_hogar: "Tipo de Hogar",
  edad_0_10: "Personas de 0-10 años",
  edad_11_25: "Personas de 11-25 años",
  edad_26_50: "Personas de 26-50 años",
  edad_51_90: "Personas de 51-90 años",
  conoce_desechos_solidos: "¿Conoce qué son los desechos sólidos domiciliarios?",
  cree_comportamiento_adecuado_manejo: "¿Cree que existe comportamiento adecuado en manejo de desechos?",
  separar_desechos_por_origen: "¿Se debe separar desechos por tipo?",
  clasificacion_correcta_desechos: "¿Es importante la clasificación correcta de desechos?",
  comportamiento_comunidad_influye: "¿El comportamiento de comunidad influye en deterioro ambiental?",
  dedica_tiempo_reducir_reutilizar_reciclar: "¿Dedica tiempo para reducir, reutilizar, reciclar?",
  desechos_solidos_problema_comunidad: "¿Los desechos son problema para la comunidad?",
  preocupa_exceso_desechos: "¿Le preocupa el exceso de desechos?",
  desechos_contaminan_ambiente: "¿Desechos intervienen en consecuencias climáticas?",
  afecta_emocionalmente_noticias_contaminacion: "¿Le afecta emocionalmente noticias de desastres?",
  frustracion_falta_acciones_ambientales: "¿Siente frustración por falta de acciones ambientales?",
  importancia_planeta_futuras_generaciones: "¿Es importante el planeta para futuras generaciones?",
  consciente_impacto_desechos_salud: "¿Es consciente del impacto de desechos en medio ambiente?",
  investiga_temas_ambientales: "¿Investiga temas medio ambientales?",
  consecuencias_acumulacion_desechos: "¿Conoce consecuencias de acumulación de desechos?",
  beneficios_reutilizar_residuo: "¿Conoce beneficios de reutilizar residuos?",
  falta_informacion_obstaculo_gestion: "¿La falta de información es obstáculo para gestión?",
  desechos_organicos_funcionalidad: "¿Desechos orgánicos pueden tener otra funcionalidad?",
  acumulacion_desechos_afecta_salud: "¿Acumulación de desechos afecta salud?",
  reduccion_reciclaje_reutilizacion_cuida_ambiente: "¿Reducción y reciclaje cuida medio ambiente?",
  transformacion_desechos_nuevos_productos: "¿Transformación de desechos reduce generación?",
  necesita_info_educacion_ambiental: "¿Necesita más información de educación ambiental?",
  practica_separacion_reciclaje_ingreso: "¿Practica separación de desechos para reciclaje?",
  desechos_hogar_reutilizados: "¿Desechos del hogar pueden ser reutilizados?",
  manejo_adecuado_desechos_aporta_desarrollo: "¿Manejo adecuado aporta al desarrollo económico?",
  emprendimientos_reutilizacion_aportan_economia: "¿Emprendimientos de reutilización aportan economía?",
  manejo_adecuado_desechos_oportunidad_emprendimiento: "¿Manejo adecuado ofrece oportunidades de emprendimiento?",
  reducir_residuos_eventos_concientizacion: "¿Eventos de concientización reducen residuos?",
  participaria_talleres_buenas_practicas: "¿Participaría en talleres de buenas prácticas?",
  manejo_adecuado_desechos_impacto_ambiente: "¿Manejo adecuado impacta positivamente al ambiente?",
  dispuesto_participar_emprendimiento_desechos: "¿Está dispuesto a participar en emprendimiento?",
  participaria_feria_emprendimientos_desechos: "¿Participaría en feria de emprendimientos?",
}

export function AutosustentabilidadReportes() {
  const [datos, setDatos] = useState<any[]>([])
  const [datosFiltrados, setDatosFiltrados] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  
  // Filtros
  const [estadoCivil, setEstadoCivil] = useState("todos")
  const [nivelEducacion, setNivelEducacion] = useState("todos")
  const [situacionLaboral, setSituacionLaboral] = useState("todos")
  const [ingresoMensual, setIngresoMensual] = useState("todos")
  
  // Selección de sección y pregunta
  const [seccionSeleccionada, setSeccionSeleccionada] = useState("distribucion-demografica")
  const [preguntaSeleccionada, setPreguntaSeleccionada] = useState("")
  const [tipoGrafico, setTipoGrafico] = useState<"barras" | "torta" | "lineal">("barras")
  
  // Opciones para PDF/Word
  const [seccionesIncluidas, setSeccionesIncluidas] = useState<string[]>(Object.keys(SECCIONES))
  const [formatoDescarga, setFormatoDescarga] = useState<"pdf" | "docx">("pdf")
  const [dialogOpen, setDialogOpen] = useState(false)
  
  const chartRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    cargarDatos()
  }, [])

  const cargarDatos = async () => {
    try {
      setLoading(true)
      const supabase = createClient()

      const { data, error } = await supabase
        .from("cuestionario_comportamiento_proambiental_autosustentabilidad")
        .select("*")

      if (error) throw error

      setDatos(data || [])
      setDatosFiltrados(data || [])
      
      // Establecer pregunta inicial
      if (SECCIONES["distribucion-demografica"].campos.length > 0) {
        setPreguntaSeleccionada(SECCIONES["distribucion-demografica"].campos[0].key)
      }
    } catch (err) {
      console.error("Error cargando datos:", err)
    } finally {
      setLoading(false)
    }
  }

  // Aplicar filtros
  useEffect(() => {
    let resultados = [...datos]

    if (estadoCivil !== "todos") {
      resultados = resultados.filter((d) => 
        d.estado_civil?.toLowerCase().trim() === estadoCivil.toLowerCase().trim()
      )
    }
    if (nivelEducacion !== "todos") {
      resultados = resultados.filter((d) => 
        d.educacion_jefe_hogar?.toLowerCase().trim() === nivelEducacion.toLowerCase().trim()
      )
    }
    if (situacionLaboral !== "todos") {
      resultados = resultados.filter((d) => 
        d.situacion_laboral_jefe_hogar?.toLowerCase().trim() === situacionLaboral.toLowerCase().trim()
      )
    }
    if (ingresoMensual !== "todos") {
      resultados = resultados.filter((d) => 
        d.ingreso_mensual_jefe_hogar?.toLowerCase().trim() === ingresoMensual.toLowerCase().trim()
      )
    }

    setDatosFiltrados(resultados)
  }, [estadoCivil, nivelEducacion, situacionLaboral, ingresoMensual, datos])

  // Actualizar pregunta cuando cambia la sección
  useEffect(() => {
    const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
    if (seccion && seccion.campos.length > 0) {
      setPreguntaSeleccionada(seccion.campos[0].key)
    }
  }, [seccionSeleccionada])

  const limpiarFiltros = () => {
    setEstadoCivil("todos")
    setNivelEducacion("todos")
    setSituacionLaboral("todos")
    setIngresoMensual("todos")
  }

  const hayFiltrosActivos = estadoCivil !== "todos" || nivelEducacion !== "todos" || 
                           situacionLaboral !== "todos" || ingresoMensual !== "todos"

  // Calcular datos para gráficos
  const calcularDatosGrafico = () => {
    if (!preguntaSeleccionada || datosFiltrados.length === 0) return []

    const conteos: Record<string, number> = {}
    datosFiltrados.forEach((registro) => {
      const valor = registro[preguntaSeleccionada]
      if (valor !== null && valor !== undefined) {
        const valorStr = String(valor).trim()
        if (valorStr) {
          conteos[valorStr] = (conteos[valorStr] || 0) + 1
        }
      }
    })

    const total = Object.values(conteos).reduce((a, b) => a + b, 0)
    return Object.entries(conteos)
      .map(([name, value]) => ({
        name,
        value,
        porcentaje: total > 0 ? Number(((value / total) * 100).toFixed(2)) : 0,
      }))
      .sort((a, b) => b.value - a.value)
  }

  const datosGrafico = calcularDatosGrafico()

  // Calcular datos para tabla de sección completa
  const calcularDatosSeccion = () => {
    const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
    if (!seccion) return []

    return seccion.campos.map(campo => {
      const conteos: Record<string, number> = {}
      let total = 0
      
      datosFiltrados.forEach((registro) => {
        const valor = registro[campo.key]
        if (valor !== null && valor !== undefined) {
          const valorStr = String(valor).trim()
          if (valorStr) {
            conteos[valorStr] = (conteos[valorStr] || 0) + 1
            total++
          }
        }
      })

      const respuestas = Object.entries(conteos).map(([respuesta, cantidad]) => ({
        respuesta,
        cantidad,
        porcentaje: total > 0 ? Number(((cantidad / total) * 100).toFixed(2)) : 0
      })).sort((a, b) => b.cantidad - a.cantidad)

      return {
        pregunta: campo.label,
        key: campo.key,
        totalRespuestas: total,
        respuestas
      }
    })
  }

  const datosSeccion = calcularDatosSeccion()

  // Exportar funciones
  const exportarCSV = (datos: any[], nombreArchivo: string) => {
    if (datos.length === 0) return

    const headers = Object.keys(datos[0])
    const csvContent = [
      headers.join(","),
      ...datos.map((row) =>
        headers.map((header) => {
          const value = row[header]
          if (value === null || value === undefined) return ""
          if (typeof value === "string" && (value.includes(",") || value.includes('"'))) 
            return `"${value.replace(/"/g, '""')}"`
          return value
        }).join(",")
      ),
    ].join("\n")

    const BOM = '\uFEFF'
    const blob = new Blob([BOM + csvContent], { type: "text/csv;charset=utf-8;" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.csv`
    link.click()
  }

  const exportarExcel = (datos: any[], nombreArchivo: string) => {
    if (datos.length === 0) return

    const ws = XLSX.utils.json_to_sheet(datos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Datos")
    XLSX.writeFile(wb, `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  const exportarJSON = (datos: any[], nombreArchivo: string) => {
    if (datos.length === 0) return

    const jsonContent = JSON.stringify(datos, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.json`
    link.click()
  }

  // Obtener datos con nombres correctos
  const getDatosDBConNombresCorrectos = () => {
    return datosFiltrados.map(registro => {
      const registroConNombres: Record<string, any> = {}
      Object.entries(registro).forEach(([key, value]) => {
        const nombreCorrecto = NOMBRES_CAMPOS_DB[key] || key
        registroConNombres[nombreCorrecto] = value
      })
      return registroConNombres
    })
  }

  // Descargar gráfico
  const descargarGrafico = async (formato: 'png' | 'jpeg' | 'svg') => {
    if (!chartRef.current) return

    try {
      let dataUrl: string
      const options = {
        backgroundColor: '#ffffff',
        width: chartRef.current.offsetWidth * 2,
        height: chartRef.current.offsetHeight * 2,
        pixelRatio: 2
      }

      switch (formato) {
        case 'png':
          dataUrl = await toPng(chartRef.current, options)
          break
        case 'jpeg':
          dataUrl = await toJpeg(chartRef.current, { ...options, quality: 0.95 })
          break
        case 'svg':
          dataUrl = await toSvg(chartRef.current, options)
          break
        default:
          dataUrl = await toPng(chartRef.current, options)
      }
      
      const link = document.createElement('a')
      link.download = `grafico_autosustentabilidad_${tipoGrafico}_${new Date().toISOString().slice(0, 10)}.${formato}`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al descargar el gráfico:', error)
      alert('Error al descargar el gráfico. Inténtalo de nuevo.')
    }
  }

  // Preparar datos de tabla para descarga
  const getDatosTablaSeccion = () => {
    const resultado: any[] = []
    datosSeccion.forEach(pregunta => {
      pregunta.respuestas.forEach(resp => {
        resultado.push({
          Pregunta: pregunta.pregunta,
          Respuesta: resp.respuesta,
          Cantidad: resp.cantidad,
          "Porcentaje (%)": resp.porcentaje
        })
      })
    })
    return resultado
  }

  // Toggle sección incluida
  const toggleSeccion = (seccionKey: string) => {
    setSeccionesIncluidas(prev => 
      prev.includes(seccionKey) 
        ? prev.filter(s => s !== seccionKey)
        : [...prev, seccionKey]
    )
  }

  // Generar PDF/DOCX con formato APA 7
  const generarDocumento = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    
    const marginLeft = 25.4
    const marginTop = 25.4
    const lineHeight = 7
    let currentY = marginTop

    // Título centrado (APA 7)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    const titulo = 'Reporte de Autosustentabilidad y Comportamiento Proambiental'
    const tituloWidth = pdf.getTextWidth(titulo)
    pdf.text(titulo, (pageWidth - tituloWidth) / 2, currentY)
    currentY += lineHeight * 2

    // Información del reporte
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(11)
    pdf.text(`Fecha de generación: ${fecha}`, marginLeft, currentY)
    currentY += lineHeight
    pdf.text(`Total de registros: ${datosFiltrados.length}`, marginLeft, currentY)
    currentY += lineHeight
    
    // Filtros aplicados
    const filtrosTexto: string[] = []
    if (estadoCivil !== "todos") filtrosTexto.push(`Estado Civil: ${estadoCivil}`)
    if (nivelEducacion !== "todos") filtrosTexto.push(`Nivel Educación: ${nivelEducacion}`)
    if (situacionLaboral !== "todos") filtrosTexto.push(`Situación Laboral: ${situacionLaboral}`)
    if (ingresoMensual !== "todos") filtrosTexto.push(`Ingreso Mensual: ${ingresoMensual}`)
    
    if (filtrosTexto.length > 0) {
      pdf.text(`Filtros aplicados: ${filtrosTexto.join(', ')}`, marginLeft, currentY)
      currentY += lineHeight
    }
    currentY += lineHeight

    // Agregar secciones seleccionadas
    let tablaNumero = 1
    for (const seccionKey of seccionesIncluidas) {
      const seccion = SECCIONES[seccionKey as keyof typeof SECCIONES]
      if (!seccion) continue

      // Verificar si necesitamos nueva página
      if (currentY > 240) {
        pdf.addPage()
        currentY = marginTop
      }

      // Título de sección
      pdf.setFont('helvetica', 'bold')
      pdf.setFontSize(11)
      pdf.text(`Tabla ${tablaNumero}`, marginLeft, currentY)
      currentY += lineHeight
      pdf.setFont('helvetica', 'italic')
      pdf.text(seccion.titulo, marginLeft, currentY)
      currentY += lineHeight

      // Calcular datos de la sección
      const datosSeccionPDF = seccion.campos.map(campo => {
        const conteos: Record<string, number> = {}
        let total = 0
        
        datosFiltrados.forEach((registro) => {
          const valor = registro[campo.key]
          if (valor !== null && valor !== undefined) {
            const valorStr = String(valor).trim()
            if (valorStr) {
              conteos[valorStr] = (conteos[valorStr] || 0) + 1
              total++
            }
          }
        })

        const respuestas = Object.entries(conteos)
          .map(([respuesta, cantidad]) => ({
            respuesta,
            cantidad,
            porcentaje: total > 0 ? ((cantidad / total) * 100).toFixed(2) : '0'
          }))
          .sort((a, b) => b.cantidad - a.cantidad)

        return { pregunta: campo.label, respuestas }
      })

      // Crear tabla para la sección
      const tableData: any[][] = []
      datosSeccionPDF.forEach(item => {
        tableData.push([{ content: item.pregunta, colSpan: 3, styles: { fontStyle: 'bold', fillColor: [240, 240, 240] } }])
        item.respuestas.forEach(resp => {
          tableData.push(['', resp.respuesta, `${resp.cantidad} (${resp.porcentaje}%)`])
        })
      })

      // @ts-ignore
      pdf.autoTable({
        startY: currentY,
        head: [['Pregunta', 'Respuesta', 'Frecuencia']],
        body: tableData,
        theme: 'grid',
        headStyles: { 
          fillColor: [66, 139, 202],
          fontSize: 9,
          fontStyle: 'bold'
        },
        styles: { 
          fontSize: 8,
          cellPadding: 2
        },
        columnStyles: {
          0: { cellWidth: 80 },
          1: { cellWidth: 55 },
          2: { cellWidth: 35 }
        },
        margin: { left: marginLeft }
      })

      // @ts-ignore
      currentY = pdf.lastAutoTable?.finalY + lineHeight * 2 || currentY + 50
      tablaNumero++
    }

    // Agregar nota al pie (APA 7)
    if (currentY < 260) {
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'italic')
      pdf.text('Nota. Datos recopilados del cuestionario de comportamiento proambiental y autosustentabilidad.', marginLeft, currentY + 10)
    }

    // Descargar
    if (formatoDescarga === 'pdf') {
      pdf.save(`reporte_autosustentabilidad_APA7_${new Date().toISOString().slice(0, 10)}.pdf`)
    } else {
      const docContent = generarContenidoWord()
      const blob = new Blob([docContent], { type: 'text/html' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `reporte_autosustentabilidad_APA7_${new Date().toISOString().slice(0, 10)}.doc`
      link.click()
    }

    setDialogOpen(false)
  }

  // Generar contenido para Word
  const generarContenidoWord = () => {
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    
    let html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin: 1in; line-height: 2; }
          h1 { text-align: center; font-size: 12pt; font-weight: bold; }
          h2 { font-size: 12pt; font-weight: bold; font-style: italic; }
          p { margin: 0 0 12pt 0; }
          table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
          th, td { border: 1px solid black; padding: 4pt 8pt; font-size: 10pt; }
          th { background-color: #4287c6; color: white; }
          .pregunta { background-color: #f0f0f0; font-weight: bold; }
          .note { font-style: italic; font-size: 10pt; margin-top: 12pt; }
        </style>
      </head>
      <body>
        <h1>Reporte de Autosustentabilidad y Comportamiento Proambiental</h1>
        <p><strong>Fecha de generación:</strong> ${fecha}</p>
        <p><strong>Total de registros:</strong> ${datosFiltrados.length}</p>
    `

    let tablaNumero = 1
    for (const seccionKey of seccionesIncluidas) {
      const seccion = SECCIONES[seccionKey as keyof typeof SECCIONES]
      if (!seccion) continue

      html += `<p><strong>Tabla ${tablaNumero}</strong></p>`
      html += `<h2>${seccion.titulo}</h2>`
      html += `<table><tr><th>Pregunta</th><th>Respuesta</th><th>Frecuencia</th></tr>`

      seccion.campos.forEach(campo => {
        const conteos: Record<string, number> = {}
        let total = 0
        
        datosFiltrados.forEach((registro) => {
          const valor = registro[campo.key]
          if (valor !== null && valor !== undefined) {
            const valorStr = String(valor).trim()
            if (valorStr) {
              conteos[valorStr] = (conteos[valorStr] || 0) + 1
              total++
            }
          }
        })

        const respuestas = Object.entries(conteos)
          .map(([respuesta, cantidad]) => ({
            respuesta,
            cantidad,
            porcentaje: total > 0 ? ((cantidad / total) * 100).toFixed(2) : '0'
          }))
          .sort((a, b) => b.cantidad - a.cantidad)

        html += `<tr class="pregunta"><td colspan="3">${campo.label}</td></tr>`
        respuestas.forEach(resp => {
          html += `<tr><td></td><td>${resp.respuesta}</td><td>${resp.cantidad} (${resp.porcentaje}%)</td></tr>`
        })
      })

      html += `</table>`
      tablaNumero++
    }

    html += `
        <p class="note">Nota. Datos recopilados del cuestionario de comportamiento proambiental y autosustentabilidad.</p>
      </body>
      </html>
    `

    return html
  }

  // Obtener pregunta seleccionada label
  const getPreguntaLabel = () => {
    const seccion = SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]
    if (!seccion) return ""
    const campo = seccion.campos.find(c => c.key === preguntaSeleccionada)
    return campo?.label || ""
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-secondary-text">Cargando datos...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <Card>
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Filtros</CardTitle>
            </div>
            {hayFiltrosActivos && (
              <Button onClick={limpiarFiltros} variant="ghost" size="sm" className="text-destructive">
                <X className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="space-y-2">
              <Label>Estado Civil</Label>
              <Select value={estadoCivil} onValueChange={setEstadoCivil}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Casado">Casado</SelectItem>
                  <SelectItem value="Soltero">Soltero</SelectItem>
                  <SelectItem value="Divorciado">Divorciado</SelectItem>
                  <SelectItem value="Viudo">Viudo</SelectItem>
                  <SelectItem value="Unión libre">Unión Libre</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Nivel de Educación</Label>
              <Select value={nivelEducacion} onValueChange={setNivelEducacion}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Primaria">Primaria</SelectItem>
                  <SelectItem value="Secundaria">Secundaria</SelectItem>
                  <SelectItem value="Universidad">Universidad</SelectItem>
                  <SelectItem value="Postgrado">Postgrado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Situación Laboral</Label>
              <Select value={situacionLaboral} onValueChange={setSituacionLaboral}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Empleado">Empleado</SelectItem>
                  <SelectItem value="Temporal">Temporal</SelectItem>
                  <SelectItem value="Desempleado">Desempleado</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Ingreso Mensual</Label>
              <Select value={ingresoMensual} onValueChange={setIngresoMensual}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="todos">Todos</SelectItem>
                  <SelectItem value="Menor al sueldo básico">Menor al sueldo básico</SelectItem>
                  <SelectItem value="Sueldo básico">Sueldo básico</SelectItem>
                  <SelectItem value="Mayor al sueldo básico">Mayor al sueldo básico</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Mostrando {datosFiltrados.length} de {datos.length} registros
          </p>
        </CardContent>
      </Card>

      {/* Selector de Sección y Pregunta */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Seleccionar Datos para Gráfico</CardTitle>
          <CardDescription>
            Elige la sección y pregunta específica para visualizar
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Sección</Label>
              <Select value={seccionSeleccionada} onValueChange={setSeccionSeleccionada}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(SECCIONES).map(([key, seccion]) => (
                    <SelectItem key={key} value={key}>
                      {seccion.titulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Pregunta</Label>
              <Select value={preguntaSeleccionada} onValueChange={setPreguntaSeleccionada}>
                <SelectTrigger className="bg-background">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]?.campos.map((campo) => (
                    <SelectItem key={campo.key} value={campo.key}>
                      {campo.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Previsualización del Gráfico */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Previsualización del Gráfico</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setTipoGrafico("barras")}
                variant={tipoGrafico === "barras" ? "default" : "outline"}
                size="sm"
              >
                <BarChart3 className="w-4 h-4 mr-1" />
                Barras
              </Button>
              <Button
                onClick={() => setTipoGrafico("torta")}
                variant={tipoGrafico === "torta" ? "default" : "outline"}
                size="sm"
              >
                <PieChartIcon className="w-4 h-4 mr-1" />
                Circular
              </Button>
              <Button
                onClick={() => setTipoGrafico("lineal")}
                variant={tipoGrafico === "lineal" ? "default" : "outline"}
                size="sm"
              >
                <TrendingUp className="w-4 h-4 mr-1" />
                Línea
              </Button>
            </div>
          </div>
          <CardDescription className="mt-2">
            {getPreguntaLabel()}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={chartRef}>
            <GraficoReusable
              datos={datosGrafico}
              tipo={tipoGrafico}
              tituloX="Respuestas"
              tituloY="Cantidad"
              colors={COLORS}
            />
          </div>

          {/* Botones de descarga de gráfico */}
          <div className="flex flex-wrap gap-2 mt-4 pt-4 border-t">
            <span className="text-sm font-medium text-muted-foreground mr-2 self-center">Descargar gráfico:</span>
            <Button onClick={() => descargarGrafico('png')} variant="outline" size="sm">
              <FileImage className="w-4 h-4 mr-2" />
              PNG
            </Button>
            <Button onClick={() => descargarGrafico('jpeg')} variant="outline" size="sm">
              <FileImage className="w-4 h-4 mr-2" />
              JPEG
            </Button>
            <Button onClick={() => descargarGrafico('svg')} variant="outline" size="sm">
              <FileImage className="w-4 h-4 mr-2" />
              SVG
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Tabla de la Sección Completa */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Tabla de Sección: {SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]?.titulo}</CardTitle>
            </div>
          </div>
          <CardDescription>
            Todas las preguntas de la sección seleccionada con sus respuestas
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Pregunta</TableHead>
                  <TableHead>Respuesta</TableHead>
                  <TableHead className="text-right">Cantidad</TableHead>
                  <TableHead className="text-right">Porcentaje (%)</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {datosSeccion.map((pregunta, pIdx) => (
                  <React.Fragment key={pIdx}>
                    {pregunta.respuestas.map((resp, rIdx) => (
                      <TableRow key={`${pIdx}-${rIdx}`}>
                        {rIdx === 0 && (
                          <TableCell rowSpan={pregunta.respuestas.length} className="font-medium align-top bg-muted/30">
                            {pregunta.pregunta}
                          </TableCell>
                        )}
                        <TableCell>{resp.respuesta}</TableCell>
                        <TableCell className="text-right">{resp.cantidad}</TableCell>
                        <TableCell className="text-right">{resp.porcentaje}%</TableCell>
                      </TableRow>
                    ))}
                  </React.Fragment>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Descargas */}
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Download className="h-5 w-5 text-primary" />
            <CardTitle className="text-lg">Descargar Datos</CardTitle>
          </div>
          <CardDescription>
            Exporta los datos en diferentes formatos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* Descargar datos del gráfico actual */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Datos del gráfico actual
            </h4>
            <p className="text-sm text-muted-foreground">
              Exporta los datos de la pregunta seleccionada
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => exportarCSV(
                  datosGrafico.map(d => ({ Respuesta: d.name, Cantidad: d.value, "Porcentaje (%)": d.porcentaje })),
                  `grafico_${preguntaSeleccionada}`
                )} 
                variant="outline" 
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button 
                onClick={() => exportarExcel(
                  datosGrafico.map(d => ({ Respuesta: d.name, Cantidad: d.value, "Porcentaje (%)": d.porcentaje })),
                  `grafico_${preguntaSeleccionada}`
                )} 
                variant="outline" 
                size="sm"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                XLSX
              </Button>
              <Button 
                onClick={() => exportarJSON(
                  datosGrafico.map(d => ({ respuesta: d.name, cantidad: d.value, porcentaje: d.porcentaje })),
                  `grafico_${preguntaSeleccionada}`
                )} 
                variant="outline" 
                size="sm"
              >
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>

          {/* Descargar tabla de sección completa */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Tabla de sección completa
            </h4>
            <p className="text-sm text-muted-foreground">
              Exporta todas las preguntas de "{SECCIONES[seccionSeleccionada as keyof typeof SECCIONES]?.titulo}"
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => exportarCSV(getDatosTablaSeccion(), `seccion_${seccionSeleccionada}`)} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button onClick={() => exportarExcel(getDatosTablaSeccion(), `seccion_${seccionSeleccionada}`)} variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                XLSX
              </Button>
              <Button onClick={() => exportarJSON(getDatosTablaSeccion(), `seccion_${seccionSeleccionada}`)} variant="outline" size="sm">
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>

          {/* Descargar datos completos de la BD */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Datos completos de la base de datos
            </h4>
            <p className="text-sm text-muted-foreground">
              Exporta todos los registros filtrados ({datosFiltrados.length}) con nombres de campos correctos
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => exportarCSV(getDatosDBConNombresCorrectos(), "bd_autosustentabilidad")} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button onClick={() => exportarExcel(getDatosDBConNombresCorrectos(), "bd_autosustentabilidad")} variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                XLSX
              </Button>
              <Button onClick={() => exportarJSON(getDatosDBConNombresCorrectos(), "bd_autosustentabilidad")} variant="outline" size="sm">
                <FileJson className="w-4 h-4 mr-2" />
                JSON
              </Button>
            </div>
          </div>

          {/* Descargar PDF/Word */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Reporte completo (PDF / Word)
            </h4>
            <p className="text-sm text-muted-foreground">
              Genera un reporte formal con formato APA 7 incluyendo las secciones seleccionadas
            </p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Configurar y Descargar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-lg max-h-[80vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Configurar Reporte</DialogTitle>
                  <DialogDescription>
                    Selecciona las secciones a incluir en el reporte con formato APA 7
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-3">
                    <Label className="font-medium">Secciones a incluir:</Label>
                    <div className="space-y-2 pl-2">
                      {Object.entries(SECCIONES).map(([key, seccion]) => (
                        <div key={key} className="flex items-center space-x-2">
                          <Checkbox 
                            id={`seccion-${key}`}
                            checked={seccionesIncluidas.includes(key)}
                            onCheckedChange={() => toggleSeccion(key)}
                          />
                          <Label htmlFor={`seccion-${key}`} className="text-sm cursor-pointer">
                            {seccion.titulo}
                          </Label>
                        </div>
                      ))}
                    </div>
                    <div className="flex gap-2 pt-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSeccionesIncluidas(Object.keys(SECCIONES))}
                      >
                        Seleccionar todas
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => setSeccionesIncluidas([])}
                      >
                        Deseleccionar todas
                      </Button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Formato de descarga:</Label>
                    <Select value={formatoDescarga} onValueChange={(v: "pdf" | "docx") => setFormatoDescarga(v)}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pdf">PDF (formato APA 7)</SelectItem>
                        <SelectItem value="docx">Word / DOCX (formato APA 7)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <DialogFooter>
                  <Button variant="outline" onClick={() => setDialogOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={generarDocumento} disabled={seccionesIncluidas.length === 0}>
                    <FileText className="w-4 h-4 mr-2" />
                    Generar {formatoDescarga.toUpperCase()}
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
