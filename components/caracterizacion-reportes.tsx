"use client"

import React, { useState, useEffect, useRef } from "react"
import { createClient } from "@/lib/supabase/client"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger, DialogFooter } from "@/components/ui/dialog"
import { Download, ImageIcon, X, Filter, FileText, Eye, FileSpreadsheet, FileImage, Settings2 } from "lucide-react"
import { BarChart3, PieChartIcon, TrendingUp, FileJson, FileType } from "lucide-react"
import { toPng, toJpeg, toSvg } from 'html-to-image'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import * as XLSX from 'xlsx'
import {
  CATEGORIAS_DESECHOS,
  calcularDatosGraficos,
  calcularDatosTabla,
  type CaracterizacionRecord,
} from "@/lib/utils/caracterizacion-data"
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
  { bg: "rgba(236, 72, 153, 0.6)", border: "rgb(236, 72, 153)" },
  { bg: "rgba(14, 165, 233, 0.6)", border: "rgb(14, 165, 233)" },
  { bg: "rgba(168, 85, 247, 0.6)", border: "rgb(168, 85, 247)" },
  { bg: "rgba(34, 197, 94, 0.6)", border: "rgb(34, 197, 94)" },
  { bg: "rgba(249, 115, 22, 0.6)", border: "rgb(249, 115, 22)" },
]

// Nombres correctos para campos de la base de datos
const NOMBRES_CAMPOS_DB: Record<string, string> = {
  id: "ID",
  lugar: "Ubicación",
  fecha_registro: "Fecha de Registro",
  materia_organica_jardin_kg: "Materia Orgánica - Jardín (kg)",
  materia_organica_cocina_kg: "Materia Orgánica - Cocina (kg)",
  grasas_aceite_comestible_kg: "Grasas y Aceites - Aceite Comestible (kg)",
  medicina_jarabe_kg: "Medicina - Jarabe (kg)",
  medicina_tabletas_kg: "Medicina - Tabletas (kg)",
  papel_blanco_kg: "Papeles y Cartón - Papel Blanco (kg)",
  papel_periodico_kg: "Papeles y Cartón - Papel Periódico (kg)",
  papel_archivo_kg: "Papeles y Cartón - Papel Archivo (kg)",
  carton_kg: "Papeles y Cartón - Cartón (kg)",
  tetra_brik_kg: "Papeles y Cartón - Tetra-brik (kg)",
  plastico_pet_kg: "Plásticos - PET (kg)",
  plastico_mixto_kg: "Plásticos - Plástico Mixto (kg)",
  bot_aceite_kg: "Plásticos - Botella de Aceite (kg)",
  bolsas_kg: "Plásticos - Bolsas (kg)",
  vidrio_blanco_kg: "Vidrios - Blanco (kg)",
  vidrio_verde_kg: "Vidrios - Verde (kg)",
  vidrio_otros_kg: "Vidrios - Otros (kg)",
  latas_ferrosas_kg: "Metales - Latas Ferrosas (kg)",
  aluminio_kg: "Metales - Aluminio (kg)",
  acero_kg: "Metales - Acero (kg)",
  metal_otros_kg: "Metales - Otros (kg)",
  textiles_ropa_kg: "Textiles - Ropa, Mantas, Manteles (kg)",
  caucho_zapatos_neumaticos_kg: "Caucho - Zapatos, Neumáticos (kg)",
  cuero_zapatos_neumaticos_kg: "Cuero - Zapatos, Carteras (kg)",
  papel_higienico_kg: "Resto Sanitarios - Papel Higiénico (kg)",
  maderas_kg: "Maderas (kg)",
  baterias_tel_lamparas_kg: "Baterías - Teléfono, Lámparas (kg)",
  electronicos_electrodomesticos_kg: "Equipos Electrónicos - Electrodomésticos (kg)",
  escombros_otros_kg: "Escombros - Otros (kg)",
}

export function CaracterizacionReportes() {
  const [caracterizacionData, setCaracterizacionData] = useState<CaracterizacionRecord[]>([])
  const [caracterizacionFiltrada, setCaracterizacionFiltrada] = useState<CaracterizacionRecord[]>([])
  const [lugarCaracterizacion, setLugarCaracterizacion] = useState("todos")
  const [lugaresCaracterizacion, setLugaresCaracterizacion] = useState<string[]>([])
  const [tipoGrafico, setTipoGrafico] = useState<"barras" | "torta" | "lineal">("barras")
  const [tipoTabla, setTipoTabla] = useState<"completa" | "categorias">("categorias")
  const [loading, setLoading] = useState(true)
  
  // Opciones para PDF/Word
  const [incluirGrafico, setIncluirGrafico] = useState(true)
  const [incluirTabla, setIncluirTabla] = useState(true)
  const [tipoGraficoPDF, setTipoGraficoPDF] = useState<"barras" | "torta" | "lineal">("barras")
  const [tipoTablaPDF, setTipoTablaPDF] = useState<"completa" | "categorias">("categorias")
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

      const { data: caracterizacion, error: errCaracterizacion } = await supabase
        .from("caracterizacion_desechos_daule")
        .select("*")
        .order("fecha_registro", { ascending: false })

      if (errCaracterizacion) throw errCaracterizacion

      const registrosConValores = (caracterizacion || []).map((r) => ({
        ...r,
        materia_organica_jardin_kg: r.materia_organica_jardin_kg || 0,
        materia_organica_cocina_kg: r.materia_organica_cocina_kg || 0,
        grasas_aceite_comestible_kg: r.grasas_aceite_comestible_kg || 0,
        medicina_jarabe_kg: r.medicina_jarabe_kg || 0,
        medicina_tabletas_kg: r.medicina_tabletas_kg || 0,
        papel_blanco_kg: r.papel_blanco_kg || 0,
        papel_periodico_kg: r.papel_periodico_kg || 0,
        papel_archivo_kg: r.papel_archivo_kg || 0,
        carton_kg: r.carton_kg || 0,
        tetra_brik_kg: r.tetra_brik_kg || 0,
        plastico_pet_kg: r.plastico_pet_kg || 0,
        plastico_mixto_kg: r.plastico_mixto_kg || 0,
        bot_aceite_kg: r.bot_aceite_kg || 0,
        bolsas_kg: r.bolsas_kg || 0,
        vidrio_blanco_kg: r.vidrio_blanco_kg || 0,
        vidrio_verde_kg: r.vidrio_verde_kg || 0,
        vidrio_otros_kg: r.vidrio_otros_kg || 0,
        latas_ferrosas_kg: r.latas_ferrosas_kg || 0,
        aluminio_kg: r.aluminio_kg || 0,
        acero_kg: r.acero_kg || 0,
        metal_otros_kg: r.metal_otros_kg || 0,
        textiles_ropa_kg: r.textiles_ropa_kg || 0,
        caucho_zapatos_neumaticos_kg: r.caucho_zapatos_neumaticos_kg || 0,
        cuero_zapatos_neumaticos_kg: r.cuero_zapatos_neumaticos_kg || 0,
        papel_higienico_kg: r.papel_higienico_kg || 0,
        maderas_kg: r.maderas_kg || 0,
        baterias_tel_lamparas_kg: r.baterias_tel_lamparas_kg || 0,
        electronicos_electrodomesticos_kg: r.electronicos_electrodomesticos_kg || 0,
        escombros_otros_kg: r.escombros_otros_kg || 0,
      }))

      setCaracterizacionData(registrosConValores)
      setCaracterizacionFiltrada(registrosConValores)
      
      const lugaresUnicos = Array.from(new Set(registrosConValores.map((r: CaracterizacionRecord) => r.lugar))).filter(Boolean).sort() as string[]
      setLugaresCaracterizacion(lugaresUnicos)
    } catch (err) {
      console.error("Error cargando datos:", err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    if (lugarCaracterizacion === "todos") {
      setCaracterizacionFiltrada(caracterizacionData)
    } else {
      setCaracterizacionFiltrada(caracterizacionData.filter((r) => r.lugar === lugarCaracterizacion))
    }
  }, [lugarCaracterizacion, caracterizacionData])

  const limpiarFiltros = () => {
    setLugarCaracterizacion("todos")
  }

  // Calcular datos para gráficos
  const datosGrafico = calcularDatosGraficos(caracterizacionFiltrada)
  const { datos: datosTablaCompleta, totalDesechos } = calcularDatosTabla(caracterizacionFiltrada)

  // Calcular datos para todas las subcategorías (29)
  const calcularDatosSubcategorias = () => {
    const subcategorias: Array<{ name: string; value: number; porcentaje: number; categoria: string }> = []
    
    CATEGORIAS_DESECHOS.forEach((categoria) => {
      categoria.subcategorias.forEach((subcategoria) => {
        const total = caracterizacionFiltrada.reduce((sum, registro) => {
          const campo = subcategoria.key as keyof CaracterizacionRecord
          const valor = registro[campo]
          return sum + (typeof valor === 'number' ? valor : 0)
        }, 0)
        
        const porcentaje = totalDesechos > 0 ? (total / totalDesechos) * 100 : 0
        
        subcategorias.push({
          name: subcategoria.label,
          value: Number(total.toFixed(2)),
          porcentaje: Number(porcentaje.toFixed(2)),
          categoria: categoria.nombre
        })
      })
    })
    
    return subcategorias.sort((a, b) => b.value - a.value)
  }

  const datosSubcategorias = calcularDatosSubcategorias()

  // Preparar datos de tabla agrupados
  const tablasAgrupadas: Array<{
    categoria: string
    subcategorias: Array<{ label: string; peso: number; porcentaje: number }>
    totalCategoria: number
    totalPorcentaje: number
  }> = []

  let indice = 0
  while (indice < datosTablaCompleta.length) {
    const subcatsList: Array<{ label: string; peso: number; porcentaje: number }> = []
    let totalCat = 0
    let totalPct = 0
    let categoriaActual = ""

    while (indice < datosTablaCompleta.length && !datosTablaCompleta[indice].esTotal) {
      if (datosTablaCompleta[indice].subcategoria) {
        subcatsList.push({
          label: datosTablaCompleta[indice].subcategoria!,
          peso: datosTablaCompleta[indice].peso,
          porcentaje: datosTablaCompleta[indice].porcentaje,
        })
      }
      indice++
    }

    if (indice < datosTablaCompleta.length && datosTablaCompleta[indice].esTotal) {
      categoriaActual = datosTablaCompleta[indice].categoria
      totalCat = datosTablaCompleta[indice].peso
      totalPct = datosTablaCompleta[indice].porcentaje
      indice++
    }

    if (subcatsList.length > 0) {
      tablasAgrupadas.push({
        categoria: categoriaActual,
        subcategorias: subcatsList,
        totalCategoria: totalCat,
        totalPorcentaje: totalPct,
      })
    }
  }

  // Exportar a CSV
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

  // Exportar a Excel
  const exportarExcel = (datos: any[], nombreArchivo: string) => {
    if (datos.length === 0) return

    const ws = XLSX.utils.json_to_sheet(datos)
    const wb = XLSX.utils.book_new()
    XLSX.utils.book_append_sheet(wb, ws, "Datos")
    XLSX.writeFile(wb, `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.xlsx`)
  }

  // Exportar a JSON
  const exportarJSON = (datos: any[], nombreArchivo: string) => {
    if (datos.length === 0) return

    const jsonContent = JSON.stringify(datos, null, 2)
    const blob = new Blob([jsonContent], { type: "application/json" })
    const link = document.createElement("a")
    link.href = URL.createObjectURL(blob)
    link.download = `${nombreArchivo}_${new Date().toISOString().slice(0, 10)}.json`
    link.click()
  }

  // Obtener datos con nombres correctos para exportación de base de datos
  const getDatosDBConNombresCorrectos = () => {
    return caracterizacionFiltrada.map(registro => {
      const registroConNombres: Record<string, any> = {}
      Object.entries(registro).forEach(([key, value]) => {
        const nombreCorrecto = NOMBRES_CAMPOS_DB[key] || key
        registroConNombres[nombreCorrecto] = value
      })
      return registroConNombres
    })
  }

  // Descargar gráfico como imagen
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
      link.download = `grafico_caracterizacion_${tipoGrafico}_${new Date().toISOString().slice(0, 10)}.${formato}`
      link.href = dataUrl
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
    } catch (error) {
      console.error('Error al descargar el gráfico:', error)
      alert('Error al descargar el gráfico. Inténtalo de nuevo.')
    }
  }

  // Generar PDF/DOCX con formato APA 7
  const generarDocumento = async () => {
    const pdf = new jsPDF('p', 'mm', 'a4')
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    const pageWidth = pdf.internal.pageSize.getWidth()
    
    // Configuración de fuentes y márgenes APA 7
    const marginLeft = 25.4 // 1 pulgada en mm
    const marginTop = 25.4
    const lineHeight = 7
    let currentY = marginTop

    // Título centrado (APA 7)
    pdf.setFontSize(12)
    pdf.setFont('helvetica', 'bold')
    const titulo = 'Reporte de Caracterización de Desechos Sólidos Domiciliarios'
    const tituloWidth = pdf.getTextWidth(titulo)
    pdf.text(titulo, (pageWidth - tituloWidth) / 2, currentY)
    currentY += lineHeight * 2

    // Información del reporte
    pdf.setFont('helvetica', 'normal')
    pdf.setFontSize(11)
    pdf.text(`Fecha de generación: ${fecha}`, marginLeft, currentY)
    currentY += lineHeight
    pdf.text(`Ubicación: ${lugarCaracterizacion === "todos" ? "Todas las ubicaciones" : lugarCaracterizacion}`, marginLeft, currentY)
    currentY += lineHeight
    pdf.text(`Total de registros: ${caracterizacionFiltrada.length}`, marginLeft, currentY)
    currentY += lineHeight
    pdf.text(`Total de desechos: ${totalDesechos.toFixed(2)} kg`, marginLeft, currentY)
    currentY += lineHeight * 2

    // Agregar gráfico si está seleccionado
    if (incluirGrafico && chartRef.current) {
      try {
        pdf.setFont('helvetica', 'bold')
        pdf.text('Figura 1', marginLeft, currentY)
        currentY += lineHeight
        pdf.setFont('helvetica', 'italic')
        const tipoGraficoTexto = tipoGraficoPDF === 'barras' ? 'Barras' : tipoGraficoPDF === 'torta' ? 'Circular' : 'Línea'
        pdf.text(`Distribución de Desechos Sólidos por Categoría (Gráfico de ${tipoGraficoTexto})`, marginLeft, currentY)
        currentY += lineHeight

        const chartDataUrl = await toPng(chartRef.current, {
          backgroundColor: '#ffffff',
          width: chartRef.current.offsetWidth,
          height: chartRef.current.offsetHeight,
          pixelRatio: 2
        })
        
        const imgWidth = 160
        const imgHeight = 90
        pdf.addImage(chartDataUrl, 'PNG', marginLeft, currentY, imgWidth, imgHeight)
        currentY += imgHeight + lineHeight * 2
      } catch (error) {
        console.error('Error al agregar gráfico al PDF:', error)
      }
    }

    // Agregar tabla si está seleccionada
    if (incluirTabla) {
      // Verificar si necesitamos nueva página
      if (currentY > 200) {
        pdf.addPage()
        currentY = marginTop
      }

      pdf.setFont('helvetica', 'bold')
      pdf.text('Tabla 1', marginLeft, currentY)
      currentY += lineHeight
      pdf.setFont('helvetica', 'italic')
      const tipoTablaTexto = tipoTablaPDF === 'completa' ? 'Detallada por Subcategorías (29 subcategorías)' : 'Resumida por Categorías (15 categorías)'
      pdf.text(`Distribución de Desechos Sólidos ${tipoTablaTexto}`, marginLeft, currentY)
      currentY += lineHeight

      let tableData: any[][]
      let tableHead: string[][]

      if (tipoTablaPDF === 'completa') {
        // Tabla con 29 subcategorías
        tableHead = [['Categoría', 'Subcategoría', 'Peso (kg)', 'Porcentaje (%)']]
        tableData = tablasAgrupadas.flatMap(grupo => [
          ...grupo.subcategorias.map((sub, idx) => [
            idx === 0 ? grupo.categoria : '',
            sub.label,
            sub.peso.toFixed(2),
            sub.porcentaje.toFixed(2)
          ]),
          [`Total ${grupo.categoria}`, '', grupo.totalCategoria.toFixed(2), grupo.totalPorcentaje.toFixed(2)]
        ])
        tableData.push(['TOTAL GENERAL', '', totalDesechos.toFixed(2), '100.00'])
      } else {
        // Tabla con 15 categorías
        tableHead = [['Categoría', 'Peso (kg)', 'Porcentaje (%)']]
        tableData = datosGrafico.map(item => [
          item.name,
          item.value.toFixed(2),
          item.porcentaje.toFixed(2)
        ])
        const sumaTotal = datosGrafico.reduce((sum, item) => sum + item.value, 0)
        const promedio = sumaTotal / datosGrafico.length
        tableData.push(['SUMA TOTAL', sumaTotal.toFixed(2), '100.00'])
        tableData.push(['PROMEDIO', promedio.toFixed(2), (100 / datosGrafico.length).toFixed(2)])
      }

      // @ts-ignore
      pdf.autoTable({
        startY: currentY,
        head: tableHead,
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
        columnStyles: tipoTablaPDF === 'completa' 
          ? { 0: { cellWidth: 45 }, 1: { cellWidth: 55 }, 2: { cellWidth: 35 }, 3: { cellWidth: 35 } }
          : { 0: { cellWidth: 80 }, 1: { cellWidth: 45 }, 2: { cellWidth: 45 } },
        margin: { left: marginLeft }
      })
    }

    // Agregar nota al pie (APA 7)
    // @ts-ignore
    const finalY = pdf.lastAutoTable?.finalY || currentY + 50
    if (finalY < 260) {
      pdf.setFontSize(9)
      pdf.setFont('helvetica', 'italic')
      pdf.text('Nota. Datos recopilados del sistema de caracterización de desechos sólidos domiciliarios del cantón Daule.', marginLeft, finalY + 10)
    }

    // Descargar según formato seleccionado
    if (formatoDescarga === 'pdf') {
      pdf.save(`reporte_caracterizacion_APA7_${new Date().toISOString().slice(0, 10)}.pdf`)
    } else {
      // Para DOCX, generar un formato simple basado en texto
      const docContent = generarContenidoWord()
      const blob = new Blob([docContent], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' })
      const link = document.createElement('a')
      link.href = URL.createObjectURL(blob)
      link.download = `reporte_caracterizacion_APA7_${new Date().toISOString().slice(0, 10)}.docx`
      link.click()
    }

    setDialogOpen(false)
  }

  // Generar contenido para Word (HTML que Word puede abrir)
  const generarContenidoWord = () => {
    const fecha = new Date().toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' })
    
    let html = `
      <html xmlns:o='urn:schemas-microsoft-com:office:office' xmlns:w='urn:schemas-microsoft-com:office:word'>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: 'Times New Roman', Times, serif; font-size: 12pt; margin: 1in; line-height: 2; }
          h1 { text-align: center; font-size: 12pt; font-weight: bold; }
          p { margin: 0 0 12pt 0; text-indent: 0.5in; }
          .no-indent { text-indent: 0; }
          table { border-collapse: collapse; width: 100%; margin: 12pt 0; }
          th, td { border: 1px solid black; padding: 4pt 8pt; font-size: 10pt; }
          th { background-color: #4287c6; color: white; }
          .note { font-style: italic; font-size: 10pt; margin-top: 12pt; }
        </style>
      </head>
      <body>
        <h1>Reporte de Caracterización de Desechos Sólidos Domiciliarios</h1>
        <p class="no-indent"><strong>Fecha de generación:</strong> ${fecha}</p>
        <p class="no-indent"><strong>Ubicación:</strong> ${lugarCaracterizacion === "todos" ? "Todas las ubicaciones" : lugarCaracterizacion}</p>
        <p class="no-indent"><strong>Total de registros:</strong> ${caracterizacionFiltrada.length}</p>
        <p class="no-indent"><strong>Total de desechos:</strong> ${totalDesechos.toFixed(2)} kg</p>
    `

    if (incluirTabla) {
      html += `
        <p class="no-indent"><strong>Tabla 1</strong></p>
        <p class="no-indent"><em>Distribución de Desechos Sólidos ${tipoTablaPDF === 'completa' ? 'Detallada por Subcategorías' : 'Resumida por Categorías'}</em></p>
        <table>
      `

      if (tipoTablaPDF === 'completa') {
        html += `<tr><th>Categoría</th><th>Subcategoría</th><th>Peso (kg)</th><th>Porcentaje (%)</th></tr>`
        tablasAgrupadas.forEach(grupo => {
          grupo.subcategorias.forEach((sub, idx) => {
            html += `<tr><td>${idx === 0 ? grupo.categoria : ''}</td><td>${sub.label}</td><td>${sub.peso.toFixed(2)}</td><td>${sub.porcentaje.toFixed(2)}</td></tr>`
          })
          html += `<tr style="background-color:#f0f0f0;font-weight:bold;"><td>Total ${grupo.categoria}</td><td></td><td>${grupo.totalCategoria.toFixed(2)}</td><td>${grupo.totalPorcentaje.toFixed(2)}</td></tr>`
        })
        html += `<tr style="background-color:#e0e0e0;font-weight:bold;"><td>TOTAL GENERAL</td><td></td><td>${totalDesechos.toFixed(2)}</td><td>100.00</td></tr>`
      } else {
        html += `<tr><th>Categoría</th><th>Peso (kg)</th><th>Porcentaje (%)</th></tr>`
        datosGrafico.forEach(item => {
          html += `<tr><td>${item.name}</td><td>${item.value.toFixed(2)}</td><td>${item.porcentaje.toFixed(2)}</td></tr>`
        })
        const sumaTotal = datosGrafico.reduce((sum, item) => sum + item.value, 0)
        const promedio = sumaTotal / datosGrafico.length
        html += `<tr style="background-color:#e0e0e0;font-weight:bold;"><td>SUMA TOTAL</td><td>${sumaTotal.toFixed(2)}</td><td>100.00</td></tr>`
        html += `<tr style="background-color:#f0f0f0;font-weight:bold;"><td>PROMEDIO</td><td>${promedio.toFixed(2)}</td><td>${(100 / datosGrafico.length).toFixed(2)}</td></tr>`
      }

      html += `</table>`
    }

    html += `
        <p class="note">Nota. Datos recopilados del sistema de caracterización de desechos sólidos domiciliarios del cantón Daule.</p>
      </body>
      </html>
    `

    return html
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
            {lugarCaracterizacion !== "todos" && (
              <Button onClick={limpiarFiltros} variant="ghost" size="sm" className="text-destructive">
                <X className="h-4 w-4 mr-2" />
                Limpiar
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Label>Ubicación</Label>
            <Select value={lugarCaracterizacion} onValueChange={setLugarCaracterizacion}>
              <SelectTrigger className="bg-background">
                <SelectValue placeholder="Seleccionar ubicación" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todas las ubicaciones</SelectItem>
                {lugaresCaracterizacion.map((lugar) => (
                  <SelectItem key={lugar} value={lugar}>
                    {lugar}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="mt-3 text-sm text-muted-foreground">
            Mostrando {caracterizacionFiltrada.length} de {caracterizacionData.length} registros. 
            Total de desechos: <span className="font-semibold">{totalDesechos.toFixed(2)} kg</span>
          </p>
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
          <CardDescription>
            Distribución de desechos por categoría principal ({datosGrafico.length} categorías)
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div ref={chartRef}>
            <GraficoReusable
              datos={datosGrafico}
              tipo={tipoGrafico}
              tituloX="Categorías"
              tituloY="Peso (kg)"
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

      {/* Previsualización de Tabla */}
      <Card>
        <CardHeader>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-5 w-5 text-primary" />
              <CardTitle className="text-lg">Previsualización de Tabla</CardTitle>
            </div>
            <div className="flex flex-wrap gap-2">
              <Button
                onClick={() => setTipoTabla("categorias")}
                variant={tipoTabla === "categorias" ? "default" : "outline"}
                size="sm"
              >
                15 Categorías
              </Button>
              <Button
                onClick={() => setTipoTabla("completa")}
                variant={tipoTabla === "completa" ? "default" : "outline"}
                size="sm"
              >
                29 Subcategorías
              </Button>
            </div>
          </div>
          <CardDescription>
            {tipoTabla === "categorias" 
              ? "Tabla resumida con las 15 categorías principales" 
              : "Tabla completa con las 29 subcategorías"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto max-h-96 overflow-y-auto">
            {tipoTabla === "categorias" ? (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría</TableHead>
                    <TableHead className="text-right">Peso (kg)</TableHead>
                    <TableHead className="text-right">Porcentaje (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {datosGrafico.map((item, idx) => (
                    <TableRow key={idx}>
                      <TableCell className="font-medium">{item.name}</TableCell>
                      <TableCell className="text-right">{item.value.toFixed(2)}</TableCell>
                      <TableCell className="text-right">{item.porcentaje.toFixed(2)}%</TableCell>
                    </TableRow>
                  ))}
                  <TableRow className="bg-primary/10 font-bold">
                    <TableCell>SUMA TOTAL</TableCell>
                    <TableCell className="text-right">{totalDesechos.toFixed(2)}</TableCell>
                    <TableCell className="text-right">100.00%</TableCell>
                  </TableRow>
                  <TableRow className="bg-accent/10 font-semibold">
                    <TableCell>PROMEDIO</TableCell>
                    <TableCell className="text-right">{(totalDesechos / datosGrafico.length).toFixed(2)}</TableCell>
                    <TableCell className="text-right">{(100 / datosGrafico.length).toFixed(2)}%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Categoría / Subcategoría</TableHead>
                    <TableHead className="text-right">Peso (kg)</TableHead>
                    <TableHead className="text-right">Porcentaje (%)</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tablasAgrupadas.map((grupo, idx) => (
                    <React.Fragment key={`cat-${idx}`}>
                      <TableRow className="bg-primary/5">
                        <TableCell className="font-bold">{grupo.categoria}</TableCell>
                        <TableCell className="text-right"></TableCell>
                        <TableCell className="text-right"></TableCell>
                      </TableRow>
                      {grupo.subcategorias.map((sub, subIdx) => (
                        <TableRow key={`sub-${idx}-${subIdx}`}>
                          <TableCell className="pl-8 text-muted-foreground">{sub.label}</TableCell>
                          <TableCell className="text-right">{sub.peso.toFixed(2)}</TableCell>
                          <TableCell className="text-right">{sub.porcentaje.toFixed(2)}%</TableCell>
                        </TableRow>
                      ))}
                      <TableRow className="bg-accent/10 font-semibold">
                        <TableCell>Total {grupo.categoria}</TableCell>
                        <TableCell className="text-right">{grupo.totalCategoria.toFixed(2)}</TableCell>
                        <TableCell className="text-right">{grupo.totalPorcentaje.toFixed(2)}%</TableCell>
                      </TableRow>
                    </React.Fragment>
                  ))}
                  <TableRow className="bg-primary/10 font-bold">
                    <TableCell>TOTAL GENERAL</TableCell>
                    <TableCell className="text-right">{totalDesechos.toFixed(2)}</TableCell>
                    <TableCell className="text-right">100.00%</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            )}
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
          {/* Descargar datos de tabla */}
          <div className="p-4 border rounded-lg space-y-3">
            <h4 className="font-medium flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4" />
              Datos de la tabla filtrada
            </h4>
            <p className="text-sm text-muted-foreground">
              Exporta los datos de {tipoTabla === "categorias" ? "15 categorías" : "29 subcategorías"} según la previsualización actual
            </p>
            <div className="flex flex-wrap gap-2">
              <Button 
                onClick={() => exportarCSV(
                  tipoTabla === "categorias" 
                    ? datosGrafico.map(d => ({ Categoría: d.name, "Peso (kg)": d.value.toFixed(2), "Porcentaje (%)": d.porcentaje.toFixed(2) }))
                    : datosSubcategorias.map(d => ({ Categoría: d.categoria, Subcategoría: d.name, "Peso (kg)": d.value.toFixed(2), "Porcentaje (%)": d.porcentaje.toFixed(2) })),
                  `tabla_${tipoTabla}`
                )} 
                variant="outline" 
                size="sm"
              >
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button 
                onClick={() => exportarExcel(
                  tipoTabla === "categorias" 
                    ? datosGrafico.map(d => ({ Categoría: d.name, "Peso (kg)": d.value.toFixed(2), "Porcentaje (%)": d.porcentaje.toFixed(2) }))
                    : datosSubcategorias.map(d => ({ Categoría: d.categoria, Subcategoría: d.name, "Peso (kg)": d.value.toFixed(2), "Porcentaje (%)": d.porcentaje.toFixed(2) })),
                  `tabla_${tipoTabla}`
                )} 
                variant="outline" 
                size="sm"
              >
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                XLSX (Excel)
              </Button>
              <Button 
                onClick={() => exportarJSON(
                  tipoTabla === "categorias" 
                    ? datosGrafico.map(d => ({ categoria: d.name, peso_kg: d.value, porcentaje: d.porcentaje }))
                    : datosSubcategorias.map(d => ({ categoria: d.categoria, subcategoria: d.name, peso_kg: d.value, porcentaje: d.porcentaje })),
                  `tabla_${tipoTabla}`
                )} 
                variant="outline" 
                size="sm"
              >
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
              Exporta todos los registros filtrados ({caracterizacionFiltrada.length}) con nombres de campos correctos
            </p>
            <div className="flex flex-wrap gap-2">
              <Button onClick={() => exportarCSV(getDatosDBConNombresCorrectos(), "bd_caracterizacion")} variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                CSV
              </Button>
              <Button onClick={() => exportarExcel(getDatosDBConNombresCorrectos(), "bd_caracterizacion")} variant="outline" size="sm">
                <FileSpreadsheet className="w-4 h-4 mr-2" />
                XLSX (Excel)
              </Button>
              <Button onClick={() => exportarJSON(getDatosDBConNombresCorrectos(), "bd_caracterizacion")} variant="outline" size="sm">
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
              Genera un reporte formal con formato APA 7 incluyendo gráfico y tabla
            </p>
            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="default" size="sm">
                  <Settings2 className="w-4 h-4 mr-2" />
                  Configurar y Descargar
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-md">
                <DialogHeader>
                  <DialogTitle>Configurar Reporte</DialogTitle>
                  <DialogDescription>
                    Selecciona qué elementos incluir en el reporte con formato APA 7
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="incluirGrafico" 
                      checked={incluirGrafico} 
                      onCheckedChange={(checked) => setIncluirGrafico(checked as boolean)}
                    />
                    <Label htmlFor="incluirGrafico">Incluir gráfico</Label>
                  </div>
                  {incluirGrafico && (
                    <div className="ml-6 space-y-2">
                      <Label className="text-sm text-muted-foreground">Tipo de gráfico:</Label>
                      <Select value={tipoGraficoPDF} onValueChange={(v: "barras" | "torta" | "lineal") => setTipoGraficoPDF(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="barras">Gráfico de Barras</SelectItem>
                          <SelectItem value="torta">Gráfico Circular</SelectItem>
                          <SelectItem value="lineal">Gráfico de Línea</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}
                  
                  <div className="flex items-center space-x-2">
                    <Checkbox 
                      id="incluirTabla" 
                      checked={incluirTabla} 
                      onCheckedChange={(checked) => setIncluirTabla(checked as boolean)}
                    />
                    <Label htmlFor="incluirTabla">Incluir tabla</Label>
                  </div>
                  {incluirTabla && (
                    <div className="ml-6 space-y-2">
                      <Label className="text-sm text-muted-foreground">Tipo de tabla:</Label>
                      <Select value={tipoTablaPDF} onValueChange={(v: "completa" | "categorias") => setTipoTablaPDF(v)}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="categorias">15 Categorías (resumida)</SelectItem>
                          <SelectItem value="completa">29 Subcategorías (completa)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  )}

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
                  <Button onClick={generarDocumento} disabled={!incluirGrafico && !incluirTabla}>
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
