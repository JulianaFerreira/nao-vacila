package analise;

import java.io.BufferedReader;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.io.PrintWriter;

public class GerarARFF {
	private String classe;
	private String[] atributos = {"crime", "crimes", "pol�cia", "tiro", "tiros", "tiroteio", "disparo",
			"disparos", "arrast�o", "baleado", "baleada", "morto", "morta", "roubo", "celular", "arma",
			"assalto", "assaltos", "sequestro", "sequestros", "estupro", "estuprada","faca", "pedrada",
			"facada", "paulada", "fuga", "suspeitos", "bala", "suspeito"};
	private String nomesClasse ="@attribute 'Class' {'homic�dio','sequestro','assalto'}";
	
	public void gerar(String TXT){
		String dadoCrimes = "texto_crimes";
		try {
			FileReader arq = new FileReader(TXT);
			BufferedReader lerArq = new BufferedReader(arq);
			FileWriter arqS = new FileWriter(dadoCrimes + ".arff");
			PrintWriter criarArq = new PrintWriter(arqS);
			
			criarArq.append("@relation " + dadoCrimes + "\n");
			int i = 0;
			while(i < this.atributos.length){
				criarArq.append("@attribute " + this.atributos[i] + " numeric\n");
				i++;
			}
			criarArq.append(nomesClasse + "\n");
			
			criarArq.append("\n@data\n");
			String texto = lerArq.readLine();
			while(texto != null){
				contarAtributos(limparTexto(texto),criarArq);
				criarArq.append(this.classe + "\n");
				texto = lerArq.readLine();
			}
			arq.close();
			arqS.close();
		} catch (IOException e) {
			e.printStackTrace();
		}
	}
	private String limparTexto(String texto){
		StringBuffer s = new StringBuffer();
		int c;
		int i = 0;
		c = texto.charAt(i);
		while(i < texto.length()){
			if(c == '/'){
				s.append(' ');
				i++;
				c = texto.charAt(i);
				if(c == '/'){
					s.append(' ');
					i++;
					texto.charAt(i);
					String cl = "";
					while(i < texto.length()){
						cl = cl + texto.charAt(i);
						i++;
					}
					this.classe = cl;
				}else{
					s.append(' ');
					i++;
					texto.charAt(i);
				}
			}
			else if((c >= 48 && c <= 57) || (c >= 65 && c <= 90) || (c >= 97 && c <= 122) || c == '\n'
					|| (c >= 128 && c <= 144) || (c >= 146 && c <= 154) || (c >= 158 && c <= 165)
					|| (c >= 210 && c <= 216) || (c >= 222 && c <= 237) || (c >= 243 && c <= 244)){
				s.append((char)c);
				i++;
				c = texto.charAt(i);
			}
			else{
				s.append(' ');
				i++;
				c = texto.charAt(i);
			}
		}
		return s.toString();
	}
	
	private void contarAtributos(String linha, PrintWriter arq){
		int iAtr = 0;
		int iLinha;
		int iPalavra;
		int apareceAtr;
		while(iAtr < this.atributos.length){
			iLinha = 0;
			apareceAtr = 0;
			while(iLinha < linha.length()){
				if(linha.charAt(iLinha) != ' '){
					iPalavra = iLinha;
					while((linha.charAt(iPalavra) != ' ') && iPalavra < linha.length()){
						iPalavra++;
					}
					if(this.atributos[iAtr].equals(linha.substring(iLinha, iPalavra))){
						apareceAtr++;
					}
					iLinha = iPalavra;
				}else
					iLinha++;
			}
			iAtr++;
			arq.append(String.valueOf(apareceAtr));
			arq.append(", ");
		}
	}
}
