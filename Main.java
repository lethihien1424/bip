package ClusteringData;

import weka.core.Instances;
import weka.clusterers.HierarchicalClusterer;

public class Main {

    public static void main(String[] args) {
        try {
           
            String filePath = "T:\\zoo.arff";  
            Instances data = DataLoader.loadData(filePath);

            
            int numClusters = 7;  
            HierarchicalClusterer clusterer = ClustererSetup.setupClusterer(numClusters);

           
            ClusterExecution.executeClustering(clusterer, data);

           
            ClusterExecution.printClusters(clusterer, data);

           
            ClusterEvaluation.evaluateClusterAssignments(clusterer, data);
            
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
