import React, { useState } from 'react';
import { Download, Loader2 } from 'lucide-react';
import JSZip from 'jszip';
import { v4 as uuidv4 } from 'uuid';
import Card, { CardHeader, CardContent } from '../ui/Card';
import Button from '../ui/Button';

interface BcfExporterProps {
  clashes: Array<{
    id: string;
    description: string;
    status: string;
    location: string;
    discipline: string;
    severity: string;
    assignedTo: string;
    coordinates: string;
  }>;
  projectName: string;
}

const BcfExporter: React.FC<BcfExporterProps> = ({ clashes, projectName }) => {
  const [isExporting, setIsExporting] = useState(false);

  const generateBcfXml = (clash: any) => {
    const viewpoint = `
      <?xml version="1.0" encoding="UTF-8"?>
      <VisualizationInfo>
        <Components>
          <ViewSetup>
            <SpacesVisible>true</SpacesVisible>
            <SpaceBoundariesVisible>true</SpaceBoundariesVisible>
            <OpeningsVisible>true</OpeningsVisible>
          </ViewSetup>
        </Components>
        <OrthogonalCamera>
          <CameraViewPoint>${clash.coordinates}</CameraViewPoint>
          <CameraDirection>0.0,0.0,1.0</CameraDirection>
          <CameraUpVector>0.0,1.0,0.0</CameraUpVector>
          <ViewToWorldScale>1.0</ViewToWorldScale>
        </OrthogonalCamera>
      </VisualizationInfo>
    `.trim();

    const markup = `
      <?xml version="1.0" encoding="UTF-8"?>
      <Markup>
        <Topic Guid="${uuidv4()}" TopicType="Issue" TopicStatus="${clash.status}">
          <Title>${clash.description}</Title>
          <Priority>${clash.severity}</Priority>
          <Index>${clash.id}</Index>
          <Labels>${clash.discipline}</Labels>
          <CreationDate>${new Date().toISOString()}</CreationDate>
          <CreationAuthor>${clash.assignedTo}</CreationAuthor>
          <Description>${clash.description}</Description>
          <BimSnippet SnippetType="BCF" isExternal="false">
            <Reference>${clash.location}</Reference>
          </BimSnippet>
        </Topic>
      </Markup>
    `.trim();

    return { viewpoint, markup };
  };

  const exportBcf = async () => {
    try {
      setIsExporting(true);
      const zip = new JSZip();

      // Create project.bcfp file
      const projectFile = `
        <?xml version="1.0" encoding="UTF-8"?>
        <ProjectInfo>
          <Project>${projectName}</Project>
          <Name>${projectName}</Name>
        </ProjectInfo>
      `.trim();
      zip.file("project.bcfp", projectFile);

      // Create folders and files for each clash
      clashes.forEach((clash) => {
        const clashId = uuidv4();
        const clashFolder = zip.folder(clashId);
        if (clashFolder) {
          const { viewpoint, markup } = generateBcfXml(clash);
          clashFolder.file("viewpoint.bcfv", viewpoint);
          clashFolder.file("markup.bcf", markup);
        }
      });

      // Generate and download the zip file
      const content = await zip.generateAsync({ type: "blob" });
      const url = window.URL.createObjectURL(content);
      const link = document.createElement('a');
      link.href = url;
      link.download = `${projectName.replace(/\s+/g, '_')}_bcf_export.bcf`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error exporting BCF:', error);
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">BCF Export</h2>
          <Button
            onClick={exportBcf}
            disabled={isExporting || clashes.length === 0}
            leftIcon={isExporting ? <Loader2 className="animate-spin\" size={16} /> : <Download size={16} />}
          >
            {isExporting ? 'Exporting...' : 'Export BCF'}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-sm text-slate-600 dark:text-slate-400">
          {clashes.length > 0 ? (
            <p>Export {clashes.length} clashes to BCF format for use in other BIM applications.</p>
          ) : (
            <p>No clashes available for export. Add some clashes to enable BCF export.</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default BcfExporter;